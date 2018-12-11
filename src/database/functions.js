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
  //console.log(listingData);
  return listingData;
}