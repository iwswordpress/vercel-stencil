import { Component, Prop, h } from "@stencil/core";
import { MatchResults } from "@stencil/router";

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.css",
  shadow: true,
})
export class AppProfile {
  @Prop() match: MatchResults;

  normalize(name: string): string {
    if (name) {
      return name.toUpperCase();
    }
    return "";
  }

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class="app-profile">
          <p>
            Params:{" "}
            <span class="highlight">
              {this.normalize(this.match.params.name)}{" "}
            </span>
            passed as a route parameter.
          </p>
        </div>
      );
    }
  }
}
