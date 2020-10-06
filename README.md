# Eulerian Analytics

## Installation

```console
npm install eanalytics --save
```

## Usage

```js
import React from "react";
import EAnalytics from "eanalytics";

EAnalytics.initialize("domain.client.tld");
```

## Track events

```js
import React from "react";
import EAnalytics from "eanalytics";

function AddToCartButton() {
  const handleClick = (e) => {
    e.preventDefault();
    EAnalytics.track([
      "uid",
      "73467",
      "prdref",
      "C4356",
      "prdname",
      "Veste_cuir_marqueA",
    ]);
    // ...
  };

  return <button onClick={handleClick}>Add to cart</button>;
}
```
