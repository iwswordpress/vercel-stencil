import { Component, h } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div class="app-root">
        <div class="container">
          <div>
            <header>
              <h1>STENCIL VERCEL</h1>
            </header>

<<<<<<< HEAD
            <main>
              <stencil-router>
                <stencil-route-switch scrollTopOffset={0}>
                  <stencil-route url="/" component="app-home" exact={true} />
                  <stencil-route url="/profile/:name" component="app-profile" />
                </stencil-route-switch>
              </stencil-router>
            </main>
          </div>
=======
          <main>
            <stencil-router>
              <stencil-route-switch scrollTopOffset={0}>
                <stencil-route url="/" component="app-home" exact={true} />
                <stencil-route url="/profile/:name" component="app-profile" />
                <stencil-route url="/ndc/:name" component="app-ndc" />
              </stencil-route-switch>
            </stencil-router>
          </main>
>>>>>>> RC2
        </div>
      </div>
    );
  }
}
