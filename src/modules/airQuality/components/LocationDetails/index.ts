import { ILocationQueryStringProps } from "./component";
import queryString from "query-string";
import { RouteComponentProps } from "react-router-dom";
export { ConnectedLocationDetails as LocationDetails } from "./container";

export const routePredicate = (props: RouteComponentProps) => {
  const { city, coordinates, country, location } = queryString.parse(
    props.location.search
  );

  return (
    Boolean(city ?? false) &&
    Boolean(coordinates ?? false) &&
    Boolean(country ?? false) &&
    Boolean(location ?? false)
  );
};
