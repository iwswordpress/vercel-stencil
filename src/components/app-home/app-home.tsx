import { Component, h } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css",
  shadow: true,
})
export class AppHome {
  render() {
    return (
      <div class="app-home">
        <h3>Tuesday Dec 8th 2020</h3>
        <p>
          Uses stocksymbol and thus attribute stocksymbol not stock-symbol when
          stockSymbol used.
        </p>
        <iws-wordpress></iws-wordpress>
        <iws-stock-price stocksymbol="ORCL"></iws-stock-price>
        <iws-stock-finder />
        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
      </div>
    );
  }
}
