import React from "react";

const LinkCard = ({ link }) => {
  return (
    <>
      <h2 className="center">MyLink - info</h2>
      <div>
        <p>Cокращённая ссылка:</p>
        <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
      </div>
      <hr/>
      <div>
        <p>Реальный адресс (оригинальная ссылка):</p>
        <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
      </div>
      <hr/>
      <p>
        Количество переходов по ссылке:
        <strong> {link.clicks}</strong>
      </p>
      <p>
        Дата создания:
        <strong> {new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  );
};

export default LinkCard;
