import React from 'react';

class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.db = this.props.firebase.firestore();
        this.getAllCars();
    }
    getAllCars() {
        const db = this.props.firebase.firestore();
        db.collection('cars').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
    }
    render() {
        return (
            <div className="administration">
                <h2>Administration</h2>                
            </div>
        )
    }
}

export default Administration;