import firebase from 'firebase';

const firebase_config = require('../firebase_config');
firebase.initializeApp(firebase_config);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export async function fetch_classes() {
  let classes = [];
  const querySnapshot = await db.collection('car-classes').get();
  for (const doc of querySnapshot.docs) {
    classes.push({ ...doc.data(), id: doc.id });
  }
  return classes;
}

export async function fetch_class_brands(classes) {
  let brands = [];
  const cars_ref = db.collection("cars");
  classes.forEach(async (class_id) => {
    const class_ref = db.collection("car-classes").doc(class_id);
    let carSnapshot = await cars_ref.where("class", "==", class_ref).get();
    for (let car of carSnapshot.docs) {
      let brand_ref = car.get('brand');
      let brandSnapshot = await db.collection("car-brands").doc(brand_ref.id).get();
      brands.push(
        { id: brandSnapshot.id, name: brandSnapshot.get('name') });
    }
  });
  return brands;
}

export async function fetch_brand_models(brand_id) {
  const brand_ref = db.collection("car-brands").doc(brand_id);
  const querySnapshot = await db.collection("car-models").where("brand_id", "==", brand_ref).get();
  let models = [];
  querySnapshot.forEach(doc => {
    models.push({ id: doc.id, name: doc.get('name') });
  });
  return models;
}

export async function fetch_places() {
  let places = [];
  const querySnapshot = await db.collection('places').get();
  querySnapshot.forEach(doc => {
    places.push({ ...doc.data(), id: doc.id });
  });
  return places;
}

export async function search(data) {
  let res = [];
  const carsRef = db.collection('cars');
  for (const class_id of data.classes) {
    const classRef = db.collection('car-classes').doc(class_id);
    let query = carsRef.where('class', '==', classRef);
    if (data.brand !== 'all') {
      const brandRef = db.collection('car-brands').doc(data.brand);
      query = query.where('brand', '==', brandRef);
    }
    if (data.model !== 'all') {
      const modelRef = db.collection('car-models').doc(data.model);
      query = query.where('model', '==', modelRef);
    }
    const querySnapshot = await query.get();
    for (const doc of querySnapshot.docs) {
      const docData = doc.data();
      const brandRef = await docData.brand.get();
      const modelRef = await docData.model.get();
      res.push({
        ...docData,
        id: doc.id,
        brand: brandRef.data(),
        model: modelRef.data()
      });
    }
  }
  return res;
}

export async function get_all_cars_admin() {

  const allCars = await db.collection('cars').get();

  let listingData = [];

  for (const carDoc of allCars.docs) {
    const carData = carDoc.data();

    const carBrand = await carData.brand.get();
    const carModel = await carData.model.get();
    
    listingData.push([carDoc.id, `${carBrand.data().name} ${carModel.data().name}`, carData.license_plate, (carData.availability === true ? 'Available' : 'Not available'), carData.engine, carData.price]);
  }

  //console.log(listingData);

  return listingData;

}

export async function quick_search_cars_admin(expression) {

  let listingData = [];

  // Find cars by brand names
  const brandNames = await db.collection('car-brands').where('name', '==', expression).get();
  
  for (const brandNameDoc of brandNames.docs) {

    const cars = await db.collection('cars').where('brand', '==', brandNameDoc.ref).get();

    for (const carDoc of cars.docs) {
      const carData = carDoc.data();

      const carModel = await carData.model.get();

      listingData.push([carDoc.id, `${brandNameDoc.data().name} ${carModel.data().name}`, carData.license_plate, (carData.availability === true ? 'Available' : 'Not available'), carData.engine, carData.price]);
    }
  }

  // Find cars by model names
  const modelNames = await db.collection('car-models').where('name', '==', expression).get();

  for (const modelNameDoc of modelNames.docs) {

    const cars = await db.collection('cars').where('model', '==', modelNameDoc.ref).get();

    for (const carDoc of cars.docs) {
      const carData = carDoc.data();

      const carBrand = await carData.brand.get();

      listingData.push([carDoc.id, `${carBrand.data().name} ${modelNameDoc.data().name}`, carData.license_plate, (carData.availability === true ? 'Available' : 'Not available'), carData.engine, carData.price]);
    }
  }

  // Find cars by license plate
  const carsByLicensePlate = await db.collection('cars').where('license_plate', '==', expression).get();

  for (const carDoc of carsByLicensePlate.docs) {
    const carData = carDoc.data();

    const carBrand = await carData.brand.get();
    const carModel = await carData.model.get();

    listingData.push([carDoc.id, `${carBrand.data().name} ${carModel.data().name}`, carData.license_plate, (carData.availability === true ? 'Available' : 'Not available'), carData.engine, carData.price]);
  }

  // Find cars by engine
  /*const carsByEngine = await db.collection('cars').where('engine', '==', expression).get();*/
  //console.log(listingData);
  return listingData;
}

export async function save_car_data(formData, carId = null) {

  let brandRef = null;
  let classRef = null;
  let modelRef = null;

  for (const index in formData) {
    if (typeof formData[index] === 'string') {
      formData[index] = formData[index].trim();
    }
  }

  const brandsByName = await db.collection('car-brands').where('name', '==', formData.brand).get();
  if (brandsByName.docs.length > 0) {
    brandRef = brandsByName.docs[0].ref;
  } else {
    let slugFormBrand = formData.brand.toLowerCase().trim().replace(/ /g, "-");

    brandRef = await db.collection('car-brands').doc(slugFormBrand);

    await brandRef.set({
      name: formData.brand
    });
  }

  classRef = await db.collection('car-classes').doc(formData.class);

  const modelsByName = await db.collection('car-models').where('name', '==', formData.model).get();
  if (modelsByName.docs.length > 0) {
    modelRef = modelsByName.docs[0].ref;
  } else {

    let slugFormModel = formData.model.toLowerCase().trim().replace(/ /g, "-");

    modelRef = await db.collection('car-models').doc(slugFormModel);

    await modelRef.set({
      brand_id: brandRef,
      name: formData.model
    });
  }

  let result = null;

  if (carId !== null) {

    // update

    const carRef = await db.collection('cars').doc(carId);

    result = await carRef.update({
      availability: formData.availability,
      brand: brandRef,
      class: classRef,
      engine: formData.engine,
      fuel: formData.fuel,
      license_plate: formData.license_plate,
      model: modelRef,
      price: Number(formData.price),
      seats: Number(formData.seats),
      transmission: formData.transmission 
    });

  } else {

    // create

    result = await db.collection('cars').add({
      availability: (formData.availability === 'true' ? true : false),
      brand: brandRef,
      class: classRef,
      engine: formData.engine,
      fuel: formData.fuel,
      license_plate: formData.license_plate,
      model: modelRef,
      price: Number(formData.price),
      seats: Number(formData.seats),
      transmission: formData.transmission
    });
  }

  return result;

}

export async function get_car_data(carId) {
  const carDoc = await db.collection('cars').doc(carId).get();
  const carDataFetched = carDoc.data();

  const carBrand = await carDataFetched.brand.get();
  const carBrandName = carBrand.data().name;

  const carModel = await carDataFetched.model.get();
  const carModelName = carModel.data().name;

  const carClass = await carDataFetched.class.get();
  
  const carData = {
    availability: carDataFetched.availability,
    brand: carBrandName,
    class: carClass.id,
    engine: carDataFetched.engine,
    fuel: carDataFetched.fuel,
    license_plate: carDataFetched.license_plate,
    model: carModelName,
    price: carDataFetched.price,
    seats: carDataFetched.seats,
    transmission: carDataFetched.transmission
  }

  return carData;
}

export async function get_all_orders_admin() {

  const allOrders = await db.collection('orders').get();
  let listingData = [];

  for (const orderDoc of allOrders.docs) {
    const orderData = orderDoc.data();

    // Get car data
    const originalCar = await orderData.original_car.get();

    listingData.push({
      id: orderDoc.id,
      customer: {
        first_name: orderData.customer.first_name,
        last_name: orderData.customer.last_name
      },
      car: {
        id: originalCar.id,
        brand: orderData.car.brand,
        model: orderData.car.model,
        license_plate: orderData.car.license_plate,
        price: orderData.car.price
      }
    });
  }

  return listingData;
}