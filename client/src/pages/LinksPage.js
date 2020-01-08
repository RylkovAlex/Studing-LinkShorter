import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/auth.hook";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const { token } = useAuth();
  const { loading, request } = useHttp();
  const [links, setLinks] = useState([]);
  const getLinks = useCallback(async () => {
    try {
      if (!token) {
        return;
      }
      const feched = await request(`api/link`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLinks(feched);
    } catch (error) {}
  }, [request, token]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);
  if (loading) {
    return <Loader />;
  }

  return <>{links ? <LinksList links={links} /> : null}</>;
};

export default LinksPage;
