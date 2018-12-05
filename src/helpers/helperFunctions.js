import React from 'react';

function attachFirebaseToComponent(TagName, firebase) {
    const returnFunc = props => {
        return (
            <TagName 
                firebase={firebase}
                {...props}
            />
        )
    }

    return returnFunc;
}

export { attachFirebaseToComponent };