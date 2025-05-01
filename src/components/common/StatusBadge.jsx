import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'draft':
        return 'status-badge status-draft';
      case 'published':
        return 'status-badge status-published';
      case 'failed':
        return 'status-badge status-failed';
      case 'processing':
        return 'status-badge status-processing';
      default:
        return 'status-badge status-draft';
    }
  };
  
  const getStatusLabel = () => {
    switch (status) {
      case 'draft':
        return 'Draft';
      case 'published':
        return 'Published';
      case 'failed':
        return 'Failed';
      case 'processing':
        return 'Processing';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <span className={getStatusStyles()}>
      {getStatusLabel()}
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['draft', 'published', 'failed', 'processing']).isRequired,
};

export default StatusBadge;