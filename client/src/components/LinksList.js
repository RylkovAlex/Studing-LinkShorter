import React from "react";
import { Link } from "react-router-dom";

const LinksList = ({links}) => {
  if (!links.length) {
    return (
      <p className="center">Ссылок пока нет...</p>
    )
  }
  return (
    <>
    <h2 className="center">My Links</h2>
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Оригинальная</th>
          <th>Сокращённая</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Подробнее</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default LinksList;
