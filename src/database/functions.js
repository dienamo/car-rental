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
  for (let class_id of classes) {
    const class_ref = db.collection("car-classes").doc(class_id);
    let carSnapshot = await cars_ref.where("class", "==", class_ref).get();
    for (let car of carSnapshot.docs) {
      let brand_ref = car.get('brand');
      let brandSnapshot = await db.collection("car-brands").doc(brand_ref.id).get();
      brands.push(
        { id: brandSnapshot.id, name: brandSnapshot.get('name') }
      );
    }
  }
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

export async function fetch_car(car_id) {
  const carSnapshot = await db.collection('cars').doc(car_id).get();
  if (carSnapshot.exists) {
    let data = carSnapshot.data();
    const brandSnapshot = await data.brand.get();
    data.brand = brandSnapshot.data();
    const modelSnapshot = await data.model.get();
    data.model = modelSnapshot.data();
    const classSnapshot = await data.class.get();
    data.class = classSnapshot.data();
    return data;
  }
  return null;
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
  return listingData;
}

export async function save_car_data_admin(formData, carId = null) {

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

export async function get_car_data_admin(carId, params = null) {
  const carDoc = await db.collection('cars').doc(carId).get();
  const carDataFetched = carDoc.data();

  let carBrand = null;
  let carModel = null;
  let carClass = null;

  let returnData = {
    availability: carDataFetched.availability,
    engine: carDataFetched.engine,
    fuel: carDataFetched.fuel,
    license_plate: carDataFetched.license_plate,
    price: carDataFetched.price,
    seats: carDataFetched.seats,
    transmission: carDataFetched.transmission
  }

  if (params === null || params.indexOf('brand') !== -1) {
    carBrand = await carDataFetched.brand.get();
    returnData.brand = carBrand.data().name;
  }

  if (params === null || params.indexOf('model') !== -1) {
    carModel = await carDataFetched.model.get();
    returnData.model = carModel.data().name;
  }

  if (params === null || params.indexOf('class') !== -1) {
    carClass = await carDataFetched.class.get();
    returnData.class = carClass.id;
  }

  return returnData;
}

export async function get_all_orders_admin() {

  const allOrders = await db.collection('orders').get();
  let listingData = [];

  for (const orderDoc of allOrders.docs) {
    const orderData = orderDoc.data();

    // Get car data
    const originalCar = await orderData.original_car.get();
    const orderCreatedAt = new Date(orderData.created_at.seconds * 1000);

    listingData.push({
      id: orderDoc.id,
      created_at: `${orderCreatedAt.getDate()}. ${orderCreatedAt.getMonth() + 1}. ${orderCreatedAt.getFullYear()} ${orderCreatedAt.getHours()}:${orderCreatedAt.getMinutes()}`,
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

export async function get_order_data_admin(orderId) {
  const orderDoc = await db.collection('orders').doc(orderId).get();
  const orderDataFetched = orderDoc.data();

  const orderDropoffPlace = await orderDataFetched.dropoff_place.get();
  const orderDropoffPlaceData = orderDropoffPlace.data();
  const orderDropoffDate = new Date(orderDataFetched.dropoff_datetime.seconds * 1000);

  const orderPickupPlace = await orderDataFetched.pickup_place.get();
  const orderPickupPlaceData = orderPickupPlace.data();
  const orderPickupDate = new Date(orderDataFetched.pickup_datetime.seconds * 1000);

  const orderCreatedAt = new Date(orderDataFetched.created_at.seconds * 1000);

  const orderData = {
    state: orderDataFetched.state,
    created_at: `${orderCreatedAt.getDate()}. ${orderCreatedAt.getMonth() + 1}. ${orderCreatedAt.getFullYear()} ${orderCreatedAt.getHours()}:${orderCreatedAt.getMinutes()}`,
    customer: {
      first_name: orderDataFetched.customer.first_name,
      last_name: orderDataFetched.customer.last_name,
      email: orderDataFetched.customer.email,
      phone_number: orderDataFetched.customer.phone_number,
    },
    car: {
      brand: orderDataFetched.car.brand,
      model: orderDataFetched.car.model,
      license_plate: orderDataFetched.car.license_plate,
      price: orderDataFetched.car.price
    },
    pickup_details: {
      place_name: orderPickupPlaceData.name,
      place_address: orderPickupPlaceData.address,
      place_gps: `${orderPickupPlaceData.gps.latitude}° N, ${orderPickupPlaceData.gps.longitude}° E`,
      datetime: `${orderPickupDate.getDate()}. ${orderPickupDate.getMonth() + 1}. ${orderPickupDate.getFullYear()}`
    },
    dropoff_details: {
      place_name: orderDropoffPlaceData.name,
      place_address: orderDropoffPlaceData.address,
      place_gps: `${orderDropoffPlaceData.gps.latitude}° N, ${orderDropoffPlaceData.gps.longitude}° E`,
      datetime: `${orderDropoffDate.getDate()}. ${orderDropoffDate.getMonth() + 1}. ${orderDropoffDate.getFullYear()}`
    }
  }

  return orderData;
}

export async function save_order(formData, carId) {
  
  let originalCarRef = null;
  let dropoffPlaceRef = null;
  let pickupPlaceRef = null;

  let carData = await get_car_data_admin(carId, ['brand', 'model']);

  let result = null;

  for (const index in formData) {
    if (typeof formData[index] === 'string') {
      formData[index] = formData[index].trim();
    }
  }

  originalCarRef = await db.collection('cars').doc(carId);
  dropoffPlaceRef = await db.collection('places').doc(formData.dropoff_place);
  pickupPlaceRef = await db.collection('places').doc(formData.pickup_place);

  result = await db.collection('orders').add({
    car: {
      brand: carData.brand,
      license_plate: carData.license_plate,
      model: carData.model,
      price: carData.price
    },
    customer: {
      email: formData.customer_email,
      first_name: formData.customer_first_name,
      last_name: formData.customer_last_name,
      phone_number: formData.customer_phone_number
    },
    dropoff_datetime: formData.dropoff_datetime,
    dropoff_place: dropoffPlaceRef,
    original_car: originalCarRef,
    pickup_datetime: formData.pickup_datetime,
    pickup_place: pickupPlaceRef,
    state: 'accepted',
    created_at: new Date()
  });

  return result;

}