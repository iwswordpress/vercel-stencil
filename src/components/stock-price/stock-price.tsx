import {
  Component,
  State,
  Element,
  Listen,
  Prop,
  Watch,
  h,
} from "@stencil/core";

import { AV_API_KEY } from "../../global/global";

@Component({
  tag: "iws-stock-price",
  styleUrl: "./stock-price.css",
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  // initialStockSymbol: string;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stockInputValid = false;
  @State() error: string;
  @State() loading = false;

  @Prop({ mutable: true, reflect: true }) stocksymbol: string;
  // if you use stockSymbol then attribute must be stock-symbol

  @Watch("stocksymbol")
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.fetchStockPrice(newValue);
    }
  }

  @Listen("ucSymbolSelected", { target: "body" })
  onStockSymbolSelected(event: CustomEvent) {
    console.log("stock symbol selected: " + event.detail);
    if (event.detail && event.detail !== this.stocksymbol) {
      this.stocksymbol = event.detail;
    }
  }
  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    if (this.stockUserInput.trim() !== "") {
      this.stockInputValid = true;
    } else {
      this.stockInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stocksymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    this.stocksymbol = this.stockInput.value;
    // this.fetchStockPrice(stocksymbol);
  }

  componentWillLoad() {
    //console.log('componentWillLoad');
    //console.log(this.stockSymbol);
  }

  componentDidLoad() {
    //console.log('componentDidLoad');
    if (this.stocksymbol) {
      // this.initialstocksymbol = this.stocksymbol;
      this.stockUserInput = this.stocksymbol;
      this.stockInputValid = true;
      this.fetchStockPrice(this.stocksymbol);
    }
  }

  componentWillUpdate() {
    //console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    //console.log('componentDidUpdate');
    // if (this.stockSymbol !== this.initialStockSymbol) {
    //   this.initialStockSymbol = this.stockSymbol;
    //   this.fetchStockPrice(this.stockSymbol);
    // }
  }

  disconnectedCallback() {
    console.log("disconnectedCallback");
  }

  fetchStockPrice(stocksymbol: string) {
    this.loading = true;
    fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocksymbol}&apikey=${AV_API_KEY}`
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Invalid!");
        }
        return res.json();
      })
      .then((parsedRes) => {
        if (!parsedRes["Global Quote"]["05. price"]) {
          throw new Error("Invalid symbol!");
        }
        this.error = null;
        this.fetchedPrice = +parsedRes["Global Quote"]["05. price"];
        console.log(this.stockUserInput + " is $" + this.fetchedPrice);
        this.loading = false;
      })
      .catch((err) => {
        this.error = err.message;
        this.loading = false;
      });
  }

  hostData() {
    return { class: this.error ? "error" : "" };
  }

  render() {
    let dataContent = <p>Please enter a symbol!</p>;
    if (this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if (this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }
    if (this.loading) {
      dataContent = <uc-spinner></uc-spinner>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <h3>VERCEL</h3>
        <p>iwswordpress-ionic npm </p>
        <input
          id="stock-symbol"
          ref={(el) => (this.stockInput = el)}
          value={this.stockUserInput}
          onInput={this.onUserInput.bind(this)}
        />
        <button type="submit" disabled={!this.stockInputValid || this.loading}>
          Fetch
        </button>
      </form>,
      <div>{dataContent}</div>,
    ];
  }
}
