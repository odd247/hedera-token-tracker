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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst MIRROR_NODE_URL = \"https://mainnet-public.mirrornode.hedera.com\";\nasync function getTokenInfo(tokenId) {\n    try {\n        const url = \"\".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId);\n        console.log(\"Fetching token info from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Token Info Response:\", {\n            name: response.data.name,\n            symbol: response.data.symbol,\n            decimals: response.data.decimals,\n            total_supply: response.data.total_supply,\n            max_supply: response.data.max_supply,\n            treasury_account_id: response.data.treasury_account_id,\n            admin_key: response.data.admin_key\n        });\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    try {\n        var _response_data_balances, _response_data_links, _response_data_balances1, _response_data_links1;\n        const tokenInfo = await getTokenInfo(tokenId);\n        const url = \"\".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId, \"/balances\");\n        console.log(\"Fetching token balances from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url, {\n            params: {\n                limit: 100,\n                order: \"desc\",\n                orderby: \"balance\"\n            }\n        });\n        console.log(\"Response data:\", {\n            total: (_response_data_balances = response.data.balances) === null || _response_data_balances === void 0 ? void 0 : _response_data_balances.length,\n            hasNext: !!((_response_data_links = response.data.links) === null || _response_data_links === void 0 ? void 0 : _response_data_links.next),\n            firstBalance: (_response_data_balances1 = response.data.balances) === null || _response_data_balances1 === void 0 ? void 0 : _response_data_balances1[0]\n        });\n        const holders = response.data.balances;\n        const totalAccounts = ((_response_data_links1 = response.data.links) === null || _response_data_links1 === void 0 ? void 0 : _response_data_links1.next) ? \"Over 100\" : holders.length;\n        const decimals = Number(tokenInfo.decimals);\n        const oneToken = BigInt(10 ** decimals);\n        const stats = {\n            totalAccounts: totalAccounts,\n            accountsAboveOne: holders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n        };\n        // No need to sort again since the API should return sorted results\n        const sortedHolders = holders.slice(0, limit);\n        const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n        const formattedHolders = sortedHolders.map((holder)=>{\n            const holderBalance = BigInt(holder.balance);\n            const percentage = Number(holderBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n            return {\n                account: holder.account,\n                balance: holder.balance,\n                percentage\n            };\n        });\n        // Log the top 5 holders for verification\n        console.log(\"Top 5 holders:\", formattedHolders.slice(0, 5).map((h)=>({\n                account: h.account,\n                balance: formatBalance(h.balance, decimals),\n                percentage: h.percentage\n            })));\n        return {\n            holders: formattedHolders,\n            stats\n        };\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token holders:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n// Helper function to format raw balance with decimals\nfunction formatBalance(balance, decimals) {\n    const balanceBN = BigInt(balance);\n    const divisor = BigInt(10 ** decimals);\n    const wholePart = balanceBN / divisor;\n    const fractionalPart = balanceBN % divisor;\n    let result = wholePart.toString();\n    if (fractionalPart > 0) {\n        let fractionalStr = fractionalPart.toString().padStart(decimals, \"0\");\n        while(fractionalStr.endsWith(\"0\")){\n            fractionalStr = fractionalStr.slice(0, -1);\n        }\n        if (fractionalStr.length > 0) {\n            result += \".\" + fractionalStr;\n        }\n    }\n    return result;\n}\nasync function getAccountInfo(accountId) {\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/accounts/\").concat(accountId));\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching account info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9oZWRlcmEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxrQkFBa0I7QUFnQmpCLGVBQWVDLGFBQWFDLE9BQWU7SUFDaEQsSUFBSTtRQUNGLE1BQU1DLE1BQU0sR0FBb0NELE9BQWpDRixpQkFBZ0IsbUJBQXlCLE9BQVJFO1FBQ2hERSxRQUFRQyxHQUFHLENBQUMsNkJBQTZCRjtRQUN6QyxNQUFNRyxXQUFXLE1BQU1QLDZDQUFLQSxDQUFDUSxHQUFHLENBQUNKO1FBQ2pDQyxRQUFRQyxHQUFHLENBQUMsd0JBQXdCO1lBQ2xDRyxNQUFNRixTQUFTRyxJQUFJLENBQUNELElBQUk7WUFDeEJFLFFBQVFKLFNBQVNHLElBQUksQ0FBQ0MsTUFBTTtZQUM1QkMsVUFBVUwsU0FBU0csSUFBSSxDQUFDRSxRQUFRO1lBQ2hDQyxjQUFjTixTQUFTRyxJQUFJLENBQUNHLFlBQVk7WUFDeENDLFlBQVlQLFNBQVNHLElBQUksQ0FBQ0ksVUFBVTtZQUNwQ0MscUJBQXFCUixTQUFTRyxJQUFJLENBQUNLLG1CQUFtQjtZQUN0REMsV0FBV1QsU0FBU0csSUFBSSxDQUFDTSxTQUFTO1FBQ3BDO1FBQ0EsT0FBT1QsU0FBU0csSUFBSTtJQUN0QixFQUFFLE9BQU9PLE9BQVk7WUFFVEEsaUJBQ0lBLGtCQUNOQSxrQkFDREE7UUFKUFosUUFBUVksS0FBSyxDQUFDLDhCQUE4QjtZQUMxQ0MsTUFBTSxHQUFFRCxrQkFBQUEsTUFBTVYsUUFBUSxjQUFkVSxzQ0FBQUEsZ0JBQWdCQyxNQUFNO1lBQzlCQyxVQUFVLEdBQUVGLG1CQUFBQSxNQUFNVixRQUFRLGNBQWRVLHVDQUFBQSxpQkFBZ0JFLFVBQVU7WUFDdENULElBQUksR0FBRU8sbUJBQUFBLE1BQU1WLFFBQVEsY0FBZFUsdUNBQUFBLGlCQUFnQlAsSUFBSTtZQUMxQk4sR0FBRyxHQUFFYSxnQkFBQUEsTUFBTUcsTUFBTSxjQUFaSCxvQ0FBQUEsY0FBY2IsR0FBRztRQUN4QjtRQUNBLE1BQU1hO0lBQ1I7QUFDRjtBQUVPLGVBQWVJLGdCQUFnQmxCLE9BQWU7UUFBRW1CLFFBQUFBLGlFQUFnQjtJQUNyRSxJQUFJO1lBY09mLHlCQUNJQSxzQkFDR0EsMEJBSU1BO1FBbkJ0QixNQUFNZ0IsWUFBWSxNQUFNckIsYUFBYUM7UUFFckMsTUFBTUMsTUFBTSxHQUFvQ0QsT0FBakNGLGlCQUFnQixtQkFBeUIsT0FBUkUsU0FBUTtRQUN4REUsUUFBUUMsR0FBRyxDQUFDLGlDQUFpQ0Y7UUFDN0MsTUFBTUcsV0FBVyxNQUFNUCw2Q0FBS0EsQ0FBQ1EsR0FBRyxDQUFDSixLQUFLO1lBQ3BDb0IsUUFBUTtnQkFDTkYsT0FBTztnQkFDUEcsT0FBTztnQkFDUEMsU0FBUztZQUNYO1FBQ0Y7UUFFQXJCLFFBQVFDLEdBQUcsQ0FBQyxrQkFBa0I7WUFDNUJxQixLQUFLLEdBQUVwQiwwQkFBQUEsU0FBU0csSUFBSSxDQUFDa0IsUUFBUSxjQUF0QnJCLDhDQUFBQSx3QkFBd0JzQixNQUFNO1lBQ3JDQyxTQUFTLENBQUMsR0FBQ3ZCLHVCQUFBQSxTQUFTRyxJQUFJLENBQUNxQixLQUFLLGNBQW5CeEIsMkNBQUFBLHFCQUFxQnlCLElBQUk7WUFDcENDLFlBQVksR0FBRTFCLDJCQUFBQSxTQUFTRyxJQUFJLENBQUNrQixRQUFRLGNBQXRCckIsK0NBQUFBLHdCQUF3QixDQUFDLEVBQUU7UUFDM0M7UUFFQSxNQUFNMkIsVUFBVTNCLFNBQVNHLElBQUksQ0FBQ2tCLFFBQVE7UUFDdEMsTUFBTU8sZ0JBQWdCNUIsRUFBQUEsd0JBQUFBLFNBQVNHLElBQUksQ0FBQ3FCLEtBQUssY0FBbkJ4Qiw0Q0FBQUEsc0JBQXFCeUIsSUFBSSxJQUFHLGFBQWFFLFFBQVFMLE1BQU07UUFFN0UsTUFBTWpCLFdBQVd3QixPQUFPYixVQUFVWCxRQUFRO1FBQzFDLE1BQU15QixXQUFXQyxPQUFPLE1BQU0xQjtRQUU5QixNQUFNMkIsUUFBUTtZQUNaSixlQUFlQTtZQUNmSyxrQkFBa0JOLFFBQVFPLE1BQU0sQ0FBQ0MsQ0FBQUEsU0FBVUosT0FBT0ksT0FBT0MsT0FBTyxLQUFLTixVQUFVUixNQUFNO1FBQ3ZGO1FBRUEsbUVBQW1FO1FBQ25FLE1BQU1lLGdCQUFnQlYsUUFBUVcsS0FBSyxDQUFDLEdBQUd2QjtRQUN2QyxNQUFNd0Isb0JBQW9CUixPQUFPZixVQUFVVixZQUFZO1FBRXZELE1BQU1rQyxtQkFBbUJILGNBQWNJLEdBQUcsQ0FBQ04sQ0FBQUE7WUFDekMsTUFBTU8sZ0JBQWdCWCxPQUFPSSxPQUFPQyxPQUFPO1lBQzNDLE1BQU1PLGFBQWFkLE9BQVFhLGdCQUFnQlgsT0FBTyxXQUFXUSxxQkFBc0I7WUFFbkYsT0FBTztnQkFDTEssU0FBU1QsT0FBT1MsT0FBTztnQkFDdkJSLFNBQVNELE9BQU9DLE9BQU87Z0JBQ3ZCTztZQUNGO1FBQ0Y7UUFFQSx5Q0FBeUM7UUFDekM3QyxRQUFRQyxHQUFHLENBQUMsa0JBQWtCeUMsaUJBQWlCRixLQUFLLENBQUMsR0FBRyxHQUFHRyxHQUFHLENBQUNJLENBQUFBLElBQU07Z0JBQ25FRCxTQUFTQyxFQUFFRCxPQUFPO2dCQUNsQlIsU0FBU1UsY0FBY0QsRUFBRVQsT0FBTyxFQUFFL0I7Z0JBQ2xDc0MsWUFBWUUsRUFBRUYsVUFBVTtZQUMxQjtRQUVBLE9BQU87WUFDTGhCLFNBQVNhO1lBQ1RSO1FBQ0Y7SUFDRixFQUFFLE9BQU90QixPQUFZO1lBRVRBLGlCQUNJQSxrQkFDTkEsa0JBQ0RBO1FBSlBaLFFBQVFZLEtBQUssQ0FBQyxpQ0FBaUM7WUFDN0NDLE1BQU0sR0FBRUQsa0JBQUFBLE1BQU1WLFFBQVEsY0FBZFUsc0NBQUFBLGdCQUFnQkMsTUFBTTtZQUM5QkMsVUFBVSxHQUFFRixtQkFBQUEsTUFBTVYsUUFBUSxjQUFkVSx1Q0FBQUEsaUJBQWdCRSxVQUFVO1lBQ3RDVCxJQUFJLEdBQUVPLG1CQUFBQSxNQUFNVixRQUFRLGNBQWRVLHVDQUFBQSxpQkFBZ0JQLElBQUk7WUFDMUJOLEdBQUcsR0FBRWEsZ0JBQUFBLE1BQU1HLE1BQU0sY0FBWkgsb0NBQUFBLGNBQWNiLEdBQUc7UUFDeEI7UUFDQSxNQUFNYTtJQUNSO0FBQ0Y7QUFFQSxzREFBc0Q7QUFDdEQsU0FBU29DLGNBQWNWLE9BQWUsRUFBRS9CLFFBQWdCO0lBQ3RELE1BQU0wQyxZQUFZaEIsT0FBT0s7SUFDekIsTUFBTVksVUFBVWpCLE9BQU8sTUFBTTFCO0lBQzdCLE1BQU00QyxZQUFZRixZQUFZQztJQUM5QixNQUFNRSxpQkFBaUJILFlBQVlDO0lBRW5DLElBQUlHLFNBQVNGLFVBQVVHLFFBQVE7SUFDL0IsSUFBSUYsaUJBQWlCLEdBQUc7UUFDdEIsSUFBSUcsZ0JBQWdCSCxlQUFlRSxRQUFRLEdBQUdFLFFBQVEsQ0FBQ2pELFVBQVU7UUFDakUsTUFBT2dELGNBQWNFLFFBQVEsQ0FBQyxLQUFNO1lBQ2xDRixnQkFBZ0JBLGNBQWNmLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDMUM7UUFDQSxJQUFJZSxjQUFjL0IsTUFBTSxHQUFHLEdBQUc7WUFDNUI2QixVQUFVLE1BQU1FO1FBQ2xCO0lBQ0Y7SUFDQSxPQUFPRjtBQUNUO0FBRU8sZUFBZUssZUFBZUMsU0FBaUI7SUFDcEQsSUFBSTtRQUNGLE1BQU16RCxXQUFXLE1BQU1QLDZDQUFLQSxDQUFDUSxHQUFHLENBQUMsR0FBc0N3RCxPQUFuQy9ELGlCQUFnQixxQkFBNkIsT0FBVitEO1FBQ3ZFLE9BQU96RCxTQUFTRyxJQUFJO0lBQ3RCLEVBQUUsT0FBT08sT0FBWTtZQUVUQSxpQkFDSUEsa0JBQ05BLGtCQUNEQTtRQUpQWixRQUFRWSxLQUFLLENBQUMsZ0NBQWdDO1lBQzVDQyxNQUFNLEdBQUVELGtCQUFBQSxNQUFNVixRQUFRLGNBQWRVLHNDQUFBQSxnQkFBZ0JDLE1BQU07WUFDOUJDLFVBQVUsR0FBRUYsbUJBQUFBLE1BQU1WLFFBQVEsY0FBZFUsdUNBQUFBLGlCQUFnQkUsVUFBVTtZQUN0Q1QsSUFBSSxHQUFFTyxtQkFBQUEsTUFBTVYsUUFBUSxjQUFkVSx1Q0FBQUEsaUJBQWdCUCxJQUFJO1lBQzFCTixHQUFHLEdBQUVhLGdCQUFBQSxNQUFNRyxNQUFNLGNBQVpILG9DQUFBQSxjQUFjYixHQUFHO1FBQ3hCO1FBQ0EsTUFBTWE7SUFDUjtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9oZWRlcmEudHM/NmE5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBNSVJST1JfTk9ERV9VUkwgPSAnaHR0cHM6Ly9tYWlubmV0LXB1YmxpYy5taXJyb3Jub2RlLmhlZGVyYS5jb20nO1xuXG5pbnRlcmZhY2UgVG9rZW5Ib2xkZXIge1xuICBhY2NvdW50OiBzdHJpbmc7XG4gIGJhbGFuY2U6IHN0cmluZztcbiAgcGVyY2VudGFnZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgVG9rZW5Ib2xkZXJzUmVzcG9uc2Uge1xuICBob2xkZXJzOiBUb2tlbkhvbGRlcltdO1xuICBzdGF0czoge1xuICAgIHRvdGFsQWNjb3VudHM6IG51bWJlciB8IHN0cmluZztcbiAgICBhY2NvdW50c0Fib3ZlT25lOiBudW1iZXI7XG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkluZm8odG9rZW5JZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXJsID0gYCR7TUlSUk9SX05PREVfVVJMfS9hcGkvdjEvdG9rZW5zLyR7dG9rZW5JZH1gO1xuICAgIGNvbnNvbGUubG9nKCdGZXRjaGluZyB0b2tlbiBpbmZvIGZyb206JywgdXJsKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdUb2tlbiBJbmZvIFJlc3BvbnNlOicsIHtcbiAgICAgIG5hbWU6IHJlc3BvbnNlLmRhdGEubmFtZSxcbiAgICAgIHN5bWJvbDogcmVzcG9uc2UuZGF0YS5zeW1ib2wsXG4gICAgICBkZWNpbWFsczogcmVzcG9uc2UuZGF0YS5kZWNpbWFscyxcbiAgICAgIHRvdGFsX3N1cHBseTogcmVzcG9uc2UuZGF0YS50b3RhbF9zdXBwbHksXG4gICAgICBtYXhfc3VwcGx5OiByZXNwb25zZS5kYXRhLm1heF9zdXBwbHksXG4gICAgICB0cmVhc3VyeV9hY2NvdW50X2lkOiByZXNwb25zZS5kYXRhLnRyZWFzdXJ5X2FjY291bnRfaWQsXG4gICAgICBhZG1pbl9rZXk6IHJlc3BvbnNlLmRhdGEuYWRtaW5fa2V5LFxuICAgIH0pO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9rZW4gaW5mbzonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkhvbGRlcnModG9rZW5JZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gNTApOiBQcm9taXNlPFRva2VuSG9sZGVyc1Jlc3BvbnNlPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdG9rZW5JbmZvID0gYXdhaXQgZ2V0VG9rZW5JbmZvKHRva2VuSWQpO1xuICAgIFxuICAgIGNvbnN0IHVybCA9IGAke01JUlJPUl9OT0RFX1VSTH0vYXBpL3YxL3Rva2Vucy8ke3Rva2VuSWR9L2JhbGFuY2VzYDtcbiAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgdG9rZW4gYmFsYW5jZXMgZnJvbTonLCB1cmwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybCwge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIGxpbWl0OiAxMDAsXG4gICAgICAgIG9yZGVyOiAnZGVzYycsXG4gICAgICAgIG9yZGVyYnk6ICdiYWxhbmNlJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coJ1Jlc3BvbnNlIGRhdGE6Jywge1xuICAgICAgdG90YWw6IHJlc3BvbnNlLmRhdGEuYmFsYW5jZXM/Lmxlbmd0aCxcbiAgICAgIGhhc05leHQ6ICEhcmVzcG9uc2UuZGF0YS5saW5rcz8ubmV4dCxcbiAgICAgIGZpcnN0QmFsYW5jZTogcmVzcG9uc2UuZGF0YS5iYWxhbmNlcz8uWzBdXG4gICAgfSk7XG5cbiAgICBjb25zdCBob2xkZXJzID0gcmVzcG9uc2UuZGF0YS5iYWxhbmNlcztcbiAgICBjb25zdCB0b3RhbEFjY291bnRzID0gcmVzcG9uc2UuZGF0YS5saW5rcz8ubmV4dCA/ICdPdmVyIDEwMCcgOiBob2xkZXJzLmxlbmd0aDtcblxuICAgIGNvbnN0IGRlY2ltYWxzID0gTnVtYmVyKHRva2VuSW5mby5kZWNpbWFscyk7XG4gICAgY29uc3Qgb25lVG9rZW4gPSBCaWdJbnQoMTAgKiogZGVjaW1hbHMpO1xuXG4gICAgY29uc3Qgc3RhdHMgPSB7XG4gICAgICB0b3RhbEFjY291bnRzOiB0b3RhbEFjY291bnRzLFxuICAgICAgYWNjb3VudHNBYm92ZU9uZTogaG9sZGVycy5maWx0ZXIoaG9sZGVyID0+IEJpZ0ludChob2xkZXIuYmFsYW5jZSkgPj0gb25lVG9rZW4pLmxlbmd0aFxuICAgIH07XG5cbiAgICAvLyBObyBuZWVkIHRvIHNvcnQgYWdhaW4gc2luY2UgdGhlIEFQSSBzaG91bGQgcmV0dXJuIHNvcnRlZCByZXN1bHRzXG4gICAgY29uc3Qgc29ydGVkSG9sZGVycyA9IGhvbGRlcnMuc2xpY2UoMCwgbGltaXQpO1xuICAgIGNvbnN0IHRvdGFsU3VwcGx5QmlnSW50ID0gQmlnSW50KHRva2VuSW5mby50b3RhbF9zdXBwbHkpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkSG9sZGVycyA9IHNvcnRlZEhvbGRlcnMubWFwKGhvbGRlciA9PiB7XG4gICAgICBjb25zdCBob2xkZXJCYWxhbmNlID0gQmlnSW50KGhvbGRlci5iYWxhbmNlKTtcbiAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBOdW1iZXIoKGhvbGRlckJhbGFuY2UgKiBCaWdJbnQoMTAwMDAwMCkgLyB0b3RhbFN1cHBseUJpZ0ludCkpIC8gMTAwMDA7XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnQ6IGhvbGRlci5hY2NvdW50LFxuICAgICAgICBiYWxhbmNlOiBob2xkZXIuYmFsYW5jZSxcbiAgICAgICAgcGVyY2VudGFnZVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIExvZyB0aGUgdG9wIDUgaG9sZGVycyBmb3IgdmVyaWZpY2F0aW9uXG4gICAgY29uc29sZS5sb2coJ1RvcCA1IGhvbGRlcnM6JywgZm9ybWF0dGVkSG9sZGVycy5zbGljZSgwLCA1KS5tYXAoaCA9PiAoe1xuICAgICAgYWNjb3VudDogaC5hY2NvdW50LFxuICAgICAgYmFsYW5jZTogZm9ybWF0QmFsYW5jZShoLmJhbGFuY2UsIGRlY2ltYWxzKSxcbiAgICAgIHBlcmNlbnRhZ2U6IGgucGVyY2VudGFnZVxuICAgIH0pKSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaG9sZGVyczogZm9ybWF0dGVkSG9sZGVycyxcbiAgICAgIHN0YXRzXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRva2VuIGhvbGRlcnM6Jywge1xuICAgICAgc3RhdHVzOiBlcnJvci5yZXNwb25zZT8uc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQsXG4gICAgICBkYXRhOiBlcnJvci5yZXNwb25zZT8uZGF0YSxcbiAgICAgIHVybDogZXJyb3IuY29uZmlnPy51cmxcbiAgICB9KTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZm9ybWF0IHJhdyBiYWxhbmNlIHdpdGggZGVjaW1hbHNcbmZ1bmN0aW9uIGZvcm1hdEJhbGFuY2UoYmFsYW5jZTogc3RyaW5nLCBkZWNpbWFsczogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgYmFsYW5jZUJOID0gQmlnSW50KGJhbGFuY2UpO1xuICBjb25zdCBkaXZpc29yID0gQmlnSW50KDEwICoqIGRlY2ltYWxzKTtcbiAgY29uc3Qgd2hvbGVQYXJ0ID0gYmFsYW5jZUJOIC8gZGl2aXNvcjtcbiAgY29uc3QgZnJhY3Rpb25hbFBhcnQgPSBiYWxhbmNlQk4gJSBkaXZpc29yO1xuICBcbiAgbGV0IHJlc3VsdCA9IHdob2xlUGFydC50b1N0cmluZygpO1xuICBpZiAoZnJhY3Rpb25hbFBhcnQgPiAwKSB7XG4gICAgbGV0IGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsUGFydC50b1N0cmluZygpLnBhZFN0YXJ0KGRlY2ltYWxzLCAnMCcpO1xuICAgIHdoaWxlIChmcmFjdGlvbmFsU3RyLmVuZHNXaXRoKCcwJykpIHtcbiAgICAgIGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsU3RyLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgaWYgKGZyYWN0aW9uYWxTdHIubGVuZ3RoID4gMCkge1xuICAgICAgcmVzdWx0ICs9ICcuJyArIGZyYWN0aW9uYWxTdHI7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY2NvdW50SW5mbyhhY2NvdW50SWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke01JUlJPUl9OT0RFX1VSTH0vYXBpL3YxL2FjY291bnRzLyR7YWNjb3VudElkfWApO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgYWNjb3VudCBpbmZvOicsIHtcbiAgICAgIHN0YXR1czogZXJyb3IucmVzcG9uc2U/LnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogZXJyb3IucmVzcG9uc2U/LmRhdGEsXG4gICAgICB1cmw6IGVycm9yLmNvbmZpZz8udXJsXG4gICAgfSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsIk1JUlJPUl9OT0RFX1VSTCIsImdldFRva2VuSW5mbyIsInRva2VuSWQiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJnZXQiLCJuYW1lIiwiZGF0YSIsInN5bWJvbCIsImRlY2ltYWxzIiwidG90YWxfc3VwcGx5IiwibWF4X3N1cHBseSIsInRyZWFzdXJ5X2FjY291bnRfaWQiLCJhZG1pbl9rZXkiLCJlcnJvciIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJjb25maWciLCJnZXRUb2tlbkhvbGRlcnMiLCJsaW1pdCIsInRva2VuSW5mbyIsInBhcmFtcyIsIm9yZGVyIiwib3JkZXJieSIsInRvdGFsIiwiYmFsYW5jZXMiLCJsZW5ndGgiLCJoYXNOZXh0IiwibGlua3MiLCJuZXh0IiwiZmlyc3RCYWxhbmNlIiwiaG9sZGVycyIsInRvdGFsQWNjb3VudHMiLCJOdW1iZXIiLCJvbmVUb2tlbiIsIkJpZ0ludCIsInN0YXRzIiwiYWNjb3VudHNBYm92ZU9uZSIsImZpbHRlciIsImhvbGRlciIsImJhbGFuY2UiLCJzb3J0ZWRIb2xkZXJzIiwic2xpY2UiLCJ0b3RhbFN1cHBseUJpZ0ludCIsImZvcm1hdHRlZEhvbGRlcnMiLCJtYXAiLCJob2xkZXJCYWxhbmNlIiwicGVyY2VudGFnZSIsImFjY291bnQiLCJoIiwiZm9ybWF0QmFsYW5jZSIsImJhbGFuY2VCTiIsImRpdmlzb3IiLCJ3aG9sZVBhcnQiLCJmcmFjdGlvbmFsUGFydCIsInJlc3VsdCIsInRvU3RyaW5nIiwiZnJhY3Rpb25hbFN0ciIsInBhZFN0YXJ0IiwiZW5kc1dpdGgiLCJnZXRBY2NvdW50SW5mbyIsImFjY291bnRJZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});