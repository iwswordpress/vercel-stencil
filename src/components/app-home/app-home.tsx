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
        <h3>vercel-stencil repo 1.0.0</h3>
        <p>
          Uses stocksymbol and thus attribute stocksymbol not stock-symbol when
          stockSymbol used.
        </p>
        <iws-wordpress></iws-wordpress>
        <iws-stock-price stocksymbol="ORCL"></iws-stock-price>
        <iws-stock-finder />
        <stencil-route-link url="/profile/test-params">
          <button>Profile page</button>
        </stencil-route-link>
        <stencil-route-link url="/ndc/conferences">
          <button>NDC page</button>
        </stencil-route-link>
      </div>
    );
  }
}
