"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/utils/hedera.ts":
/*!*****************************!*\
  !*** ./src/utils/hedera.ts ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst MIRROR_NODE_URL = \"https://mainnet-public.mirrornode.hedera.com\";\nasync function getTokenInfo(tokenId) {\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId));\n    console.log(\"Token Info Raw:\", response.data);\n    return response.data;\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    const tokenInfo = await getTokenInfo(tokenId);\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId, \"/balances\"), {\n        params: {\n            limit: 100,\n            order: \"desc\"\n        }\n    });\n    const holders = response.data.balances;\n    const totalSupply = tokenInfo.total_supply;\n    // Sort holders by balance using BigInt for accurate comparison\n    const sortedHolders = holders.sort((a, b)=>{\n        const balanceA = BigInt(a.balance);\n        const balanceB = BigInt(b.balance);\n        return balanceB > balanceA ? 1 : balanceB < balanceA ? -1 : 0;\n    }).slice(0, limit);\n    return sortedHolders.map((holder)=>{\n        const holderBalance = BigInt(holder.balance);\n        const totalSupplyBigInt = BigInt(totalSupply);\n        // Calculate percentage using BigInt arithmetic\n        const percentage = Number(holderBalance * BigInt(10000) / totalSupplyBigInt) / 100;\n        return {\n            account: holder.account,\n            balance: holder.balance,\n            percentage\n        };\n    });\n}\nasync function getAccountInfo(accountId) {\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/accounts/\").concat(accountId));\n    return response.data;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9oZWRlcmEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxrQkFBa0I7QUFRakIsZUFBZUMsYUFBYUMsT0FBZTtJQUNoRCxNQUFNQyxXQUFXLE1BQU1KLDZDQUFLQSxDQUFDSyxHQUFHLENBQUMsR0FBb0NGLE9BQWpDRixpQkFBZ0IsbUJBQXlCLE9BQVJFO0lBQ3JFRyxRQUFRQyxHQUFHLENBQUMsbUJBQW1CSCxTQUFTSSxJQUFJO0lBQzVDLE9BQU9KLFNBQVNJLElBQUk7QUFDdEI7QUFFTyxlQUFlQyxnQkFBZ0JOLE9BQWU7UUFBRU8sUUFBQUEsaUVBQWdCO0lBQ3JFLE1BQU1DLFlBQVksTUFBTVQsYUFBYUM7SUFFckMsTUFBTUMsV0FBVyxNQUFNSiw2Q0FBS0EsQ0FBQ0ssR0FBRyxDQUFDLEdBQW9DRixPQUFqQ0YsaUJBQWdCLG1CQUF5QixPQUFSRSxTQUFRLGNBQVk7UUFDdkZTLFFBQVE7WUFDTkYsT0FBTztZQUNQRyxPQUFPO1FBQ1Q7SUFDRjtJQUVBLE1BQU1DLFVBQVVWLFNBQVNJLElBQUksQ0FBQ08sUUFBUTtJQUN0QyxNQUFNQyxjQUFjTCxVQUFVTSxZQUFZO0lBRTFDLCtEQUErRDtJQUMvRCxNQUFNQyxnQkFBZ0JKLFFBQ25CSyxJQUFJLENBQUMsQ0FBQ0MsR0FBUUM7UUFDYixNQUFNQyxXQUFXQyxPQUFPSCxFQUFFSSxPQUFPO1FBQ2pDLE1BQU1DLFdBQVdGLE9BQU9GLEVBQUVHLE9BQU87UUFDakMsT0FBT0MsV0FBV0gsV0FBVyxJQUFJRyxXQUFXSCxXQUFXLENBQUMsSUFBSTtJQUM5RCxHQUNDSSxLQUFLLENBQUMsR0FBR2hCO0lBRVosT0FBT1EsY0FBY1MsR0FBRyxDQUFDLENBQUNDO1FBQ3hCLE1BQU1DLGdCQUFnQk4sT0FBT0ssT0FBT0osT0FBTztRQUMzQyxNQUFNTSxvQkFBb0JQLE9BQU9QO1FBQ2pDLCtDQUErQztRQUMvQyxNQUFNZSxhQUFhQyxPQUFRSCxnQkFBZ0JOLE9BQU8sU0FBU08scUJBQXNCO1FBRWpGLE9BQU87WUFDTEcsU0FBU0wsT0FBT0ssT0FBTztZQUN2QlQsU0FBU0ksT0FBT0osT0FBTztZQUN2Qk87UUFDRjtJQUNGO0FBQ0Y7QUFFTyxlQUFlRyxlQUFlQyxTQUFpQjtJQUNwRCxNQUFNL0IsV0FBVyxNQUFNSiw2Q0FBS0EsQ0FBQ0ssR0FBRyxDQUFDLEdBQXNDOEIsT0FBbkNsQyxpQkFBZ0IscUJBQTZCLE9BQVZrQztJQUN2RSxPQUFPL0IsU0FBU0ksSUFBSTtBQUN0QiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvdXRpbHMvaGVkZXJhLnRzPzZhOTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgTUlSUk9SX05PREVfVVJMID0gJ2h0dHBzOi8vbWFpbm5ldC1wdWJsaWMubWlycm9ybm9kZS5oZWRlcmEuY29tJztcblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbkhvbGRlciB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgYmFsYW5jZTogc3RyaW5nO1xuICBwZXJjZW50YWdlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkluZm8odG9rZW5JZDogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke01JUlJPUl9OT0RFX1VSTH0vYXBpL3YxL3Rva2Vucy8ke3Rva2VuSWR9YCk7XG4gIGNvbnNvbGUubG9nKCdUb2tlbiBJbmZvIFJhdzonLCByZXNwb25zZS5kYXRhKTtcbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkhvbGRlcnModG9rZW5JZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gNTApOiBQcm9taXNlPFRva2VuSG9sZGVyW10+IHtcbiAgY29uc3QgdG9rZW5JbmZvID0gYXdhaXQgZ2V0VG9rZW5JbmZvKHRva2VuSWQpO1xuICBcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYCR7TUlSUk9SX05PREVfVVJMfS9hcGkvdjEvdG9rZW5zLyR7dG9rZW5JZH0vYmFsYW5jZXNgLCB7XG4gICAgcGFyYW1zOiB7XG4gICAgICBsaW1pdDogMTAwLCAvLyBHZXQgbW9yZSByZXN1bHRzIHRvIGVuc3VyZSBwcm9wZXIgc29ydGluZ1xuICAgICAgb3JkZXI6ICdkZXNjJ1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgaG9sZGVycyA9IHJlc3BvbnNlLmRhdGEuYmFsYW5jZXM7XG4gIGNvbnN0IHRvdGFsU3VwcGx5ID0gdG9rZW5JbmZvLnRvdGFsX3N1cHBseTtcblxuICAvLyBTb3J0IGhvbGRlcnMgYnkgYmFsYW5jZSB1c2luZyBCaWdJbnQgZm9yIGFjY3VyYXRlIGNvbXBhcmlzb25cbiAgY29uc3Qgc29ydGVkSG9sZGVycyA9IGhvbGRlcnNcbiAgICAuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGJhbGFuY2VBID0gQmlnSW50KGEuYmFsYW5jZSk7XG4gICAgICBjb25zdCBiYWxhbmNlQiA9IEJpZ0ludChiLmJhbGFuY2UpO1xuICAgICAgcmV0dXJuIGJhbGFuY2VCID4gYmFsYW5jZUEgPyAxIDogYmFsYW5jZUIgPCBiYWxhbmNlQSA/IC0xIDogMDtcbiAgICB9KVxuICAgIC5zbGljZSgwLCBsaW1pdCk7XG5cbiAgcmV0dXJuIHNvcnRlZEhvbGRlcnMubWFwKChob2xkZXI6IGFueSkgPT4ge1xuICAgIGNvbnN0IGhvbGRlckJhbGFuY2UgPSBCaWdJbnQoaG9sZGVyLmJhbGFuY2UpO1xuICAgIGNvbnN0IHRvdGFsU3VwcGx5QmlnSW50ID0gQmlnSW50KHRvdGFsU3VwcGx5KTtcbiAgICAvLyBDYWxjdWxhdGUgcGVyY2VudGFnZSB1c2luZyBCaWdJbnQgYXJpdGhtZXRpY1xuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBOdW1iZXIoKGhvbGRlckJhbGFuY2UgKiBCaWdJbnQoMTAwMDApIC8gdG90YWxTdXBwbHlCaWdJbnQpKSAvIDEwMDtcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgYWNjb3VudDogaG9sZGVyLmFjY291bnQsXG4gICAgICBiYWxhbmNlOiBob2xkZXIuYmFsYW5jZSxcbiAgICAgIHBlcmNlbnRhZ2VcbiAgICB9O1xuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnRJbmZvKGFjY291bnRJZDogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke01JUlJPUl9OT0RFX1VSTH0vYXBpL3YxL2FjY291bnRzLyR7YWNjb3VudElkfWApO1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsIk1JUlJPUl9OT0RFX1VSTCIsImdldFRva2VuSW5mbyIsInRva2VuSWQiLCJyZXNwb25zZSIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwiZ2V0VG9rZW5Ib2xkZXJzIiwibGltaXQiLCJ0b2tlbkluZm8iLCJwYXJhbXMiLCJvcmRlciIsImhvbGRlcnMiLCJiYWxhbmNlcyIsInRvdGFsU3VwcGx5IiwidG90YWxfc3VwcGx5Iiwic29ydGVkSG9sZGVycyIsInNvcnQiLCJhIiwiYiIsImJhbGFuY2VBIiwiQmlnSW50IiwiYmFsYW5jZSIsImJhbGFuY2VCIiwic2xpY2UiLCJtYXAiLCJob2xkZXIiLCJob2xkZXJCYWxhbmNlIiwidG90YWxTdXBwbHlCaWdJbnQiLCJwZXJjZW50YWdlIiwiTnVtYmVyIiwiYWNjb3VudCIsImdldEFjY291bnRJbmZvIiwiYWNjb3VudElkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});