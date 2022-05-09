import React from 'react';
import PropTypes from 'prop-types';

function PromotionItem({ item }) {
  return <div>PromotionItem</div>;
}

PromotionItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PromotionItem;
