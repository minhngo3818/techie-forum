import PropTypes from "prop-types";

const RefLink = (props) => {
  return (
    <div
      className={props.profile && props.urls !== null ? props.cssClass : null}
      id={props.profile && props.urls !== null ? props.cssID : null}
    >
      {props.profile && props.urls !== null && (
        <p>
          <a href={props.urls}>{props.name}</a>
        </p>
      )}
    </div>
  );
};

export default RefLink;

RefLink.propTypes = {
  profile: PropTypes.bool,
  urls: PropTypes.string,
  name: PropTypes.string,
  cssID: PropTypes.string,
  cssClass: PropTypes.string,
};
