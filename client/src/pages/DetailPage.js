import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { useAuth } from "../hooks/auth.hook";
import { Loader } from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
  const {token} = useAuth();
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        authorization: `Bear ${token}`
      });
      setLink(fetched)
    } catch (e) {}
  }, [linkId, token, request]);

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return (<Loader/>)
  }

  return (
    <>
    {!loading && link && <LinkCard link = {link}/>}
    </>
  );
};

export default DetailPage;
