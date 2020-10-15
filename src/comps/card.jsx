import React from "react";
import { Card } from "semantic-ui-react";
import { useHistory } from "react-router";

export default function Coursecard({ amount, category, desc,time,index }) {
  const history = useHistory();

  return (
    <div>
      <Card
        header={category}
        meta={`$${amount}, ${time}`}
        description={`${desc}`}
       key={index}
      />
    </div>
  );
}
