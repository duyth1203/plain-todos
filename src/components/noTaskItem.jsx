import React from 'react';

const NoTaskItem = () => {
  return (
    <tr>
      <td colSpan="4" style={{ width: '100%' }}>
        <p
          style={{
            color: 'grey',
            fontSize: '1.5em',
            fontStyle: 'oblique',
            textAlign: 'center'
          }}
        >
          No item available
        </p>
      </td>
    </tr>
  );
};

export default NoTaskItem;
