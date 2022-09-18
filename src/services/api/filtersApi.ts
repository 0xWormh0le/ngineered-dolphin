import { seniorityFilters } from "@/interfaces/filters.interface";
import { jobTypeFilters } from "@/interfaces/filters.interface";
import { locationsFilters } from "@/interfaces/filters.interface";
import { problemsFilters } from "@/interfaces/filters.interface";

import axios from "./interceptor";

export default {
  getSeniority(): Promise<{ results: seniorityFilters[] }> {
    return axios
      .get(`/api/v1/experiences/?fields=id,short_name`)
      .then((resp: { data }) => {
        return resp.data;
      });
  },

  getJobTypes(): Promise<{ results: jobTypeFilters[] }> {
    return axios
      .get(`/api/v1/job-types/?fields=id,name`)
      .then((resp: { data }) => {
        return resp.data;
      });
  },

  getLocations(): Promise<{ results: locationsFilters[] }> {
    return axios
      .get(`/api/v1/locations/?fields=id,name,display_name`)
      .then((resp: { data }) => {
        return resp.data;
      });
  },
  getProblems(): Promise<{ results: problemsFilters[] }> {
    return axios
      .get(`/api/v1/humanity-problems/?fields=id,short_name`)
      .then((resp: { data }) => {
        return resp.data;
      });
  },
};
