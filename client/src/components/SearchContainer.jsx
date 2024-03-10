import { FormRow, FormRowSelect, SubmitBtn, AddressContainer } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import {
  JOB_TAGS,
  SORT_BY,
  JOB_SCOPES,
  EXPERIENCE,
  RATES,
  LANGUAGES,
} from "../utils/constants";
import { useAllPostsContext } from "../pages/PostsPage";

const SearchContainer = () => {
  const { searchValues, route } = useAllPostsContext();
  const { search, tags, languages, scope, experience, rate, city, sort } =
    searchValues;

  const isJobRoute = route === "jobs";

  const experienceOptions = [
    isJobRoute
      ? { label: "Doesn't matter", value: "Doesn't matter" }
      : { label: "No experience", value: "No experience" },
    ...EXPERIENCE,
  ];

  // const submit = useSubmit();

  // const debounce = (onChange) => {
  //   let timeout;
  //   return (e) => {
  //     const form = e.currentTarget.form;
  //     clearTimeout(timeout);

  //     timeout = setTimeout(() => {
  //       onChange(form);
  //     }, 2000);
  //   };
  // };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Filters</h5>

        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            placeholder="Search..."
            defaultValue={search}
          />

          <FormRowSelect
            name="scope"
            defaultValue={scope}
            options={JOB_SCOPES}
            closeMenuOnSelect
          />

          <FormRowSelect
            name="experience"
            options={experienceOptions}
            defaultValue={experience}
            closeMenuOnSelect
          />

          <FormRowSelect
            name="rate"
            options={RATES}
            defaultValue={rate}
            closeMenuOnSelect
          />

          <AddressContainer defaultValue={city} />

          <FormRowSelect
            name="sort"
            defaultValue={sort}
            options={SORT_BY}
            closeMenuOnSelect
          />
        </div>

        <div className="form-bottom">
          <FormRowSelect
            name="tags"
            defaultValue={tags?.split(", ")}
            isMulti
            options={JOB_TAGS}
            closeMenuOnSelect={false}
          />

          <FormRowSelect
            name="languages"
            defaultValue={languages?.split(", ")}
            isMulti
            options={LANGUAGES}
            closeMenuOnSelect={false}
          />
        </div>

        <div className="actions">
          <SubmitBtn formBtn text="Search" />

          <Link to={`/dashboard/${route}`} className="btn form-btn btn-outline">
            Reset filters
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
