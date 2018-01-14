"use strict";

exports.onClientEntry = function () {
  if (process.env.NODE_ENV !== "production") {
    require("preact/debug");
  }
};