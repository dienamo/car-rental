import React from 'react';
import SearchForm from './SearchForm';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="results">
        <h1 className="page-heading">Search results</h1>
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <aside>
              <SearchForm title="Edit Search" />
            </aside>
          </div>
          <div className="col-xs-12 col-md-8">
            <main>
              <article>
                <header>Article header</header>
              </article>
            </main>
          </div>
        </div>
      </div>
    )
  }
}