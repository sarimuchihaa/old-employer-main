import React from 'react';
import "../../style/pageStyle/dashboard/LatestVisitor.scss";
// const visitors = [
//   { id: 1, image: require('../../view/dashboard/download1.jpeg'), name: 'Robert Castro', company: 'Andropple Lab' },
//   { id: 2, image: require('../../view/dashboard/download1.jpeg'), name: 'Robert Castro', company: 'Andropple Lab' },
//   { id: 3, image: require('../../view/dashboard/download1.jpeg'), name: 'Robert Castro', company: 'Andropple Lab' },
//   { id: 4, image: require('../../view/dashboard/download1.jpeg'), name: 'Robert Castro', company: 'Andropple Lab' },
//   { id: 5, image: require('../../view/dashboard/download1.jpeg'), name: 'Robert Castro', company: 'Andropple Lab' },
// ];
const LatestVisitor = () => {
  const visitors = [
    { id: 1, image: '../download1.jpeg', name: 'Robert Castro', company: 'Andropple Lab' },
    { id: 2, image: './download1.jpeg', name: 'Robert Castro', company: 'Andropple Lab' },
    { id: 3, image: './download1.jpeg', name: 'Robert Castro', company: 'Andropple Lab' },
    { id: 4, image: './download1.jpeg', name: 'Robert Castro', company: 'Andropple Lab' },
    { id: 5, image: './download1.jpeg', name: 'Robert Castro', company: 'Andropple Lab' },
  ];

  return (
    <div className="latest-visitor">
      <h2>Latest Visitor</h2>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Company</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor) => (
            <tr key={visitor.id}>
              <td>#{visitor.id}</td>
              <td>
                <img src={visitor.image} alt={visitor.name} />
              </td>
              <td>{visitor.name}</td>
              <td>{visitor.company}</td>
              <td>
                <button>View Profile →</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LatestVisitor;