import React, { useState } from 'react';
import { Popover, Button } from 'antd';

function Pop({ content, title, fontSize, triggerIcon }) {
  // State to manage the visibility of the Popover
  const [popoverVisible, setPopoverVisible] = useState(false);

  // Function to toggle the visibility of the Popover
  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  return (
    <div>
      {/* Trigger icon/button */}
      <Button
        type="text"
        icon={triggerIcon}
        onClick={togglePopover}
      />

      {/* Popover */}
      <Popover
        content={
          <div style={{ fontSize }}>
            {content}
          </div>
        }
        title={title}
        visible={popoverVisible}
        onVisibleChange={setPopoverVisible}
      >
        <div>Hover over the icon</div>
      </Popover>
    </div>
  );
}

export default Pop;
