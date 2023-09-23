import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

function Pop({ prices, tokenOne, tokenTwo, customIcon }) {
  // State to manage the visibility of the Popover
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Function to toggle the visibility of the Popover
  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  // JSX structure for the Popover content
  const popoverContent = (
    <div className="popover-content">
      <p>{`1 ${tokenOne.ticker} = ${prices.tokenOne.toFixed(2)} USDT (~$${prices.tokenOne.toFixed(2)})`}</p>
      <p>{`1 ${tokenTwo.ticker} = ${prices.tokenTwo.toFixed(2)} USDT (~$${prices.tokenTwo.toFixed(2)})`}</p>
    </div>
  );

  return (
    <div>
      {/* Info icon/button */}
      <Button
        type="text"
        icon={<InfoCircleOutlined />}
        onClick={togglePopover}
      />

      {/* Popover */}
      <Popover
        content={popoverContent}
        title={null} // Set title to null to remove the title
        trigger="click"
        placement="bottomRight"
        open={isPopoverOpen} // Use "open" instead of "visible"
        onOpenChange={setIsPopoverOpen} // Use "onOpenChange" instead of "onVisibleChange"
      >
        {/* The icon/button that triggers the Popover */}
        <img src={customIcon} alt="Custom Icon" />
      </Popover>
    </div>
  );
}

export default Pop;
