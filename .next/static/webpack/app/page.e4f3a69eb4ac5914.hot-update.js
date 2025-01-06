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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst MIRROR_NODE_URL = \"https://mainnet-public.mirrornode.hedera.com/api/v1\";\nfunction formatTokenId(tokenId) {\n    // Remove any spaces and convert to lowercase\n    tokenId = tokenId.trim().toLowerCase();\n    // If it's already in shard.realm.num format, return as is\n    if (tokenId.includes(\".\")) {\n        return tokenId;\n    }\n    // If it's just a number, convert to 0.0.number format\n    if (/^\\d+$/.test(tokenId)) {\n        return \"0.0.\".concat(tokenId);\n    }\n    return tokenId;\n}\nasync function getTokenInfo(tokenId) {\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const url = \"\".concat(MIRROR_NODE_URL, \"/tokens/\").concat(formattedTokenId);\n        console.log(\"Fetching token info from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Token Info Response:\", response.data);\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config, _error_response_data, _error_response3, _error_response4;\n        console.error(\"Error fetching token info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw new Error(((_error_response3 = error.response) === null || _error_response3 === void 0 ? void 0 : (_error_response_data = _error_response3.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || ((_error_response4 = error.response) === null || _error_response4 === void 0 ? void 0 : _error_response4.statusText) || \"Error fetching token data\");\n    }\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const tokenInfo = await getTokenInfo(formattedTokenId);\n        // Use the accounts endpoint to get token holders\n        const url = \"\".concat(MIRROR_NODE_URL, \"/accounts\");\n        console.log(\"Fetching token balances from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url, {\n            params: {\n                \"account.balance\": true,\n                \"token.id\": formattedTokenId,\n                limit: 100,\n                order: \"desc\"\n            }\n        });\n        console.log(\"Response data:\", response.data);\n        // Transform the response to get token balances\n        const holders = response.data.accounts.filter((account)=>account.balance && account.balance.tokens).map((account)=>{\n            var _account_balance_tokens_find;\n            return {\n                account: account.account,\n                balance: ((_account_balance_tokens_find = account.balance.tokens.find((t)=>t.token_id === formattedTokenId)) === null || _account_balance_tokens_find === void 0 ? void 0 : _account_balance_tokens_find.balance) || \"0\"\n            };\n        }).filter((holder)=>holder.balance !== \"0\");\n        const totalAccounts = holders.length;\n        const decimals = Number(tokenInfo.decimals);\n        const oneToken = BigInt(10 ** decimals);\n        const stats = {\n            totalAccounts: totalAccounts,\n            accountsAboveOne: holders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n        };\n        // Sort holders by balance\n        const sortedHolders = [\n            ...holders\n        ].sort((a, b)=>{\n            const balanceA = BigInt(a.balance);\n            const balanceB = BigInt(b.balance);\n            return balanceB > balanceA ? 1 : balanceB < balanceA ? -1 : 0;\n        }).slice(0, limit);\n        const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n        const formattedHolders = sortedHolders.map((holder)=>{\n            const holderBalance = BigInt(holder.balance);\n            const percentage = Number(holderBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n            return {\n                account: holder.account,\n                balance: holder.balance,\n                percentage\n            };\n        });\n        return {\n            holders: formattedHolders,\n            stats\n        };\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token holders:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\nasync function getAccountInfo(accountId) {\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/accounts/\").concat(accountId));\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching account info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n// Helper function to format raw balance with decimals\nfunction formatBalance(balance, decimals) {\n    const balanceBN = BigInt(balance);\n    const divisor = BigInt(10 ** decimals);\n    const wholePart = balanceBN / divisor;\n    const fractionalPart = balanceBN % divisor;\n    let result = wholePart.toString();\n    if (fractionalPart > 0) {\n        let fractionalStr = fractionalPart.toString().padStart(decimals, \"0\");\n        while(fractionalStr.endsWith(\"0\")){\n            fractionalStr = fractionalStr.slice(0, -1);\n        }\n        if (fractionalStr.length > 0) {\n            result += \".\" + fractionalStr;\n        }\n    }\n    return result;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHO1FBQ3RCLElBQUlHLGdCQUFnQkgsZUFBZUUsUUFBUSxHQUFHRSxRQUFRLENBQUM1QixVQUFVO1FBQ2pFLE1BQU8yQixjQUFjRSxRQUFRLENBQUMsS0FBTTtZQUNsQ0YsZ0JBQWdCQSxjQUFjZixLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzFDO1FBQ0EsSUFBSWUsY0FBYzVCLE1BQU0sR0FBRyxHQUFHO1lBQzVCMEIsVUFBVSxNQUFNRTtRQUNsQjtJQUNGO0lBQ0EsT0FBT0Y7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvdXRpbHMvaGVkZXJhLnRzPzZhOTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgTUlSUk9SX05PREVfVVJMID0gJ2h0dHBzOi8vbWFpbm5ldC1wdWJsaWMubWlycm9ybm9kZS5oZWRlcmEuY29tL2FwaS92MSc7XG5cbmludGVyZmFjZSBUb2tlbkhvbGRlciB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgYmFsYW5jZTogc3RyaW5nO1xuICBwZXJjZW50YWdlOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBUb2tlbkhvbGRlcnNSZXNwb25zZSB7XG4gIGhvbGRlcnM6IFRva2VuSG9sZGVyW107XG4gIHN0YXRzOiB7XG4gICAgdG90YWxBY2NvdW50czogbnVtYmVyIHwgc3RyaW5nO1xuICAgIGFjY291bnRzQWJvdmVPbmU6IG51bWJlcjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VG9rZW5JZCh0b2tlbklkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBSZW1vdmUgYW55IHNwYWNlcyBhbmQgY29udmVydCB0byBsb3dlcmNhc2VcbiAgdG9rZW5JZCA9IHRva2VuSWQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIFxuICAvLyBJZiBpdCdzIGFscmVhZHkgaW4gc2hhcmQucmVhbG0ubnVtIGZvcm1hdCwgcmV0dXJuIGFzIGlzXG4gIGlmICh0b2tlbklkLmluY2x1ZGVzKCcuJykpIHtcbiAgICByZXR1cm4gdG9rZW5JZDtcbiAgfVxuICBcbiAgLy8gSWYgaXQncyBqdXN0IGEgbnVtYmVyLCBjb252ZXJ0IHRvIDAuMC5udW1iZXIgZm9ybWF0XG4gIGlmICgvXlxcZCskLy50ZXN0KHRva2VuSWQpKSB7XG4gICAgcmV0dXJuIGAwLjAuJHt0b2tlbklkfWA7XG4gIH1cbiAgXG4gIHJldHVybiB0b2tlbklkO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW5JbmZvKHRva2VuSWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IGZvcm1hdHRlZFRva2VuSWQgPSBmb3JtYXRUb2tlbklkKHRva2VuSWQpO1xuICAgIGNvbnN0IHVybCA9IGAke01JUlJPUl9OT0RFX1VSTH0vdG9rZW5zLyR7Zm9ybWF0dGVkVG9rZW5JZH1gO1xuICAgIGNvbnNvbGUubG9nKCdGZXRjaGluZyB0b2tlbiBpbmZvIGZyb206JywgdXJsKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdUb2tlbiBJbmZvIFJlc3BvbnNlOicsIHJlc3BvbnNlLmRhdGEpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9rZW4gaW5mbzonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8IFxuICAgICAgZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgXG4gICAgICAnRXJyb3IgZmV0Y2hpbmcgdG9rZW4gZGF0YSdcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkhvbGRlcnModG9rZW5JZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gNTApOiBQcm9taXNlPFRva2VuSG9sZGVyc1Jlc3BvbnNlPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybWF0dGVkVG9rZW5JZCA9IGZvcm1hdFRva2VuSWQodG9rZW5JZCk7XG4gICAgY29uc3QgdG9rZW5JbmZvID0gYXdhaXQgZ2V0VG9rZW5JbmZvKGZvcm1hdHRlZFRva2VuSWQpO1xuICAgIFxuICAgIC8vIFVzZSB0aGUgYWNjb3VudHMgZW5kcG9pbnQgdG8gZ2V0IHRva2VuIGhvbGRlcnNcbiAgICBjb25zdCB1cmwgPSBgJHtNSVJST1JfTk9ERV9VUkx9L2FjY291bnRzYDtcbiAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgdG9rZW4gYmFsYW5jZXMgZnJvbTonLCB1cmwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybCwge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgICdhY2NvdW50LmJhbGFuY2UnOiB0cnVlLFxuICAgICAgICAndG9rZW4uaWQnOiBmb3JtYXR0ZWRUb2tlbklkLFxuICAgICAgICBsaW1pdDogMTAwLFxuICAgICAgICBvcmRlcjogJ2Rlc2MnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZygnUmVzcG9uc2UgZGF0YTonLCByZXNwb25zZS5kYXRhKTtcblxuICAgIC8vIFRyYW5zZm9ybSB0aGUgcmVzcG9uc2UgdG8gZ2V0IHRva2VuIGJhbGFuY2VzXG4gICAgY29uc3QgaG9sZGVycyA9IHJlc3BvbnNlLmRhdGEuYWNjb3VudHNcbiAgICAgIC5maWx0ZXIoKGFjY291bnQ6IGFueSkgPT4gYWNjb3VudC5iYWxhbmNlICYmIGFjY291bnQuYmFsYW5jZS50b2tlbnMpXG4gICAgICAubWFwKChhY2NvdW50OiBhbnkpID0+ICh7XG4gICAgICAgIGFjY291bnQ6IGFjY291bnQuYWNjb3VudCxcbiAgICAgICAgYmFsYW5jZTogYWNjb3VudC5iYWxhbmNlLnRva2Vucy5maW5kKCh0OiBhbnkpID0+IHQudG9rZW5faWQgPT09IGZvcm1hdHRlZFRva2VuSWQpPy5iYWxhbmNlIHx8ICcwJ1xuICAgICAgfSkpXG4gICAgICAuZmlsdGVyKChob2xkZXI6IGFueSkgPT4gaG9sZGVyLmJhbGFuY2UgIT09ICcwJyk7XG5cbiAgICBjb25zdCB0b3RhbEFjY291bnRzID0gaG9sZGVycy5sZW5ndGg7XG4gICAgY29uc3QgZGVjaW1hbHMgPSBOdW1iZXIodG9rZW5JbmZvLmRlY2ltYWxzKTtcbiAgICBjb25zdCBvbmVUb2tlbiA9IEJpZ0ludCgxMCAqKiBkZWNpbWFscyk7XG5cbiAgICBjb25zdCBzdGF0cyA9IHtcbiAgICAgIHRvdGFsQWNjb3VudHM6IHRvdGFsQWNjb3VudHMsXG4gICAgICBhY2NvdW50c0Fib3ZlT25lOiBob2xkZXJzLmZpbHRlcihob2xkZXIgPT4gQmlnSW50KGhvbGRlci5iYWxhbmNlKSA+PSBvbmVUb2tlbikubGVuZ3RoXG4gICAgfTtcblxuICAgIC8vIFNvcnQgaG9sZGVycyBieSBiYWxhbmNlXG4gICAgY29uc3Qgc29ydGVkSG9sZGVycyA9IFsuLi5ob2xkZXJzXVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgYmFsYW5jZUEgPSBCaWdJbnQoYS5iYWxhbmNlKTtcbiAgICAgICAgY29uc3QgYmFsYW5jZUIgPSBCaWdJbnQoYi5iYWxhbmNlKTtcbiAgICAgICAgcmV0dXJuIGJhbGFuY2VCID4gYmFsYW5jZUEgPyAxIDogYmFsYW5jZUIgPCBiYWxhbmNlQSA/IC0xIDogMDtcbiAgICAgIH0pXG4gICAgICAuc2xpY2UoMCwgbGltaXQpO1xuXG4gICAgY29uc3QgdG90YWxTdXBwbHlCaWdJbnQgPSBCaWdJbnQodG9rZW5JbmZvLnRvdGFsX3N1cHBseSk7XG5cbiAgICBjb25zdCBmb3JtYXR0ZWRIb2xkZXJzID0gc29ydGVkSG9sZGVycy5tYXAoaG9sZGVyID0+IHtcbiAgICAgIGNvbnN0IGhvbGRlckJhbGFuY2UgPSBCaWdJbnQoaG9sZGVyLmJhbGFuY2UpO1xuICAgICAgY29uc3QgcGVyY2VudGFnZSA9IE51bWJlcigoaG9sZGVyQmFsYW5jZSAqIEJpZ0ludCgxMDAwMDAwKSAvIHRvdGFsU3VwcGx5QmlnSW50KSkgLyAxMDAwMDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWNjb3VudDogaG9sZGVyLmFjY291bnQsXG4gICAgICAgIGJhbGFuY2U6IGhvbGRlci5iYWxhbmNlLFxuICAgICAgICBwZXJjZW50YWdlXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhvbGRlcnM6IGZvcm1hdHRlZEhvbGRlcnMsXG4gICAgICBzdGF0c1xuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b2tlbiBob2xkZXJzOicsIHtcbiAgICAgIHN0YXR1czogZXJyb3IucmVzcG9uc2U/LnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogZXJyb3IucmVzcG9uc2U/LmRhdGEsXG4gICAgICB1cmw6IGVycm9yLmNvbmZpZz8udXJsXG4gICAgfSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnRJbmZvKGFjY291bnRJZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYCR7TUlSUk9SX05PREVfVVJMfS9hY2NvdW50cy8ke2FjY291bnRJZH1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGFjY291bnQgaW5mbzonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBmb3JtYXQgcmF3IGJhbGFuY2Ugd2l0aCBkZWNpbWFsc1xuZnVuY3Rpb24gZm9ybWF0QmFsYW5jZShiYWxhbmNlOiBzdHJpbmcsIGRlY2ltYWxzOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBiYWxhbmNlQk4gPSBCaWdJbnQoYmFsYW5jZSk7XG4gIGNvbnN0IGRpdmlzb3IgPSBCaWdJbnQoMTAgKiogZGVjaW1hbHMpO1xuICBjb25zdCB3aG9sZVBhcnQgPSBiYWxhbmNlQk4gLyBkaXZpc29yO1xuICBjb25zdCBmcmFjdGlvbmFsUGFydCA9IGJhbGFuY2VCTiAlIGRpdmlzb3I7XG4gIFxuICBsZXQgcmVzdWx0ID0gd2hvbGVQYXJ0LnRvU3RyaW5nKCk7XG4gIGlmIChmcmFjdGlvbmFsUGFydCA+IDApIHtcbiAgICBsZXQgZnJhY3Rpb25hbFN0ciA9IGZyYWN0aW9uYWxQYXJ0LnRvU3RyaW5nKCkucGFkU3RhcnQoZGVjaW1hbHMsICcwJyk7XG4gICAgd2hpbGUgKGZyYWN0aW9uYWxTdHIuZW5kc1dpdGgoJzAnKSkge1xuICAgICAgZnJhY3Rpb25hbFN0ciA9IGZyYWN0aW9uYWxTdHIuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICBpZiAoZnJhY3Rpb25hbFN0ci5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQgKz0gJy4nICsgZnJhY3Rpb25hbFN0cjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsIk1JUlJPUl9OT0RFX1VSTCIsImZvcm1hdFRva2VuSWQiLCJ0b2tlbklkIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0ZXN0IiwiZ2V0VG9rZW5JbmZvIiwiZm9ybWF0dGVkVG9rZW5JZCIsInVybCIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZSIsImdldCIsImRhdGEiLCJlcnJvciIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJjb25maWciLCJFcnJvciIsIm1lc3NhZ2UiLCJnZXRUb2tlbkhvbGRlcnMiLCJsaW1pdCIsInRva2VuSW5mbyIsInBhcmFtcyIsIm9yZGVyIiwiaG9sZGVycyIsImFjY291bnRzIiwiZmlsdGVyIiwiYWNjb3VudCIsImJhbGFuY2UiLCJ0b2tlbnMiLCJtYXAiLCJmaW5kIiwidCIsInRva2VuX2lkIiwiaG9sZGVyIiwidG90YWxBY2NvdW50cyIsImxlbmd0aCIsImRlY2ltYWxzIiwiTnVtYmVyIiwib25lVG9rZW4iLCJCaWdJbnQiLCJzdGF0cyIsImFjY291bnRzQWJvdmVPbmUiLCJzb3J0ZWRIb2xkZXJzIiwic29ydCIsImEiLCJiIiwiYmFsYW5jZUEiLCJiYWxhbmNlQiIsInNsaWNlIiwidG90YWxTdXBwbHlCaWdJbnQiLCJ0b3RhbF9zdXBwbHkiLCJmb3JtYXR0ZWRIb2xkZXJzIiwiaG9sZGVyQmFsYW5jZSIsInBlcmNlbnRhZ2UiLCJnZXRBY2NvdW50SW5mbyIsImFjY291bnRJZCIsImZvcm1hdEJhbGFuY2UiLCJiYWxhbmNlQk4iLCJkaXZpc29yIiwid2hvbGVQYXJ0IiwiZnJhY3Rpb25hbFBhcnQiLCJyZXN1bHQiLCJ0b1N0cmluZyIsImZyYWN0aW9uYWxTdHIiLCJwYWRTdGFydCIsImVuZHNXaXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});