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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst MIRROR_NODE_URL = \"https://mainnet-public.mirrornode.hedera.com/api/v1\";\nfunction formatTokenId(tokenId) {\n    // Remove any spaces and convert to lowercase\n    tokenId = tokenId.trim().toLowerCase();\n    // If it's already in shard.realm.num format, return as is\n    if (tokenId.includes(\".\")) {\n        return tokenId;\n    }\n    // If it's just a number, convert to 0.0.number format\n    if (/^\\d+$/.test(tokenId)) {\n        return \"0.0.\".concat(tokenId);\n    }\n    return tokenId;\n}\nasync function getTokenInfo(tokenId) {\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const url = \"\".concat(MIRROR_NODE_URL, \"/tokens/\").concat(formattedTokenId);\n        console.log(\"Fetching token info from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Token Info Response:\", response.data);\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config, _error_response_data, _error_response3, _error_response4;\n        console.error(\"Error fetching token info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw new Error(((_error_response3 = error.response) === null || _error_response3 === void 0 ? void 0 : (_error_response_data = _error_response3.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || ((_error_response4 = error.response) === null || _error_response4 === void 0 ? void 0 : _error_response4.statusText) || \"Error fetching token data\");\n    }\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const tokenInfo = await getTokenInfo(formattedTokenId);\n        // Get token balances directly\n        const url = \"\".concat(MIRROR_NODE_URL, \"/tokens/\").concat(formattedTokenId, \"/balances\");\n        console.log(\"Fetching token balances from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Balance Response:\", response.data);\n        if (!response.data.balances) {\n            throw new Error(\"No balance data found\");\n        }\n        const holders = response.data.balances;\n        const decimals = Number(tokenInfo.decimals);\n        const oneToken = BigInt(10 ** decimals);\n        // Sort holders by balance\n        const sortedHolders = [\n            ...holders\n        ].sort((a, b)=>{\n            const balanceA = BigInt(a.balance);\n            const balanceB = BigInt(b.balance);\n            return balanceB > balanceA ? 1 : balanceB < balanceA ? -1 : 0;\n        }).slice(0, limit);\n        const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n        const formattedHolders = sortedHolders.map((holder)=>{\n            const holderBalance = BigInt(holder.balance);\n            const percentage = Number(holderBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n            return {\n                account: holder.account,\n                balance: holder.balance,\n                percentage\n            };\n        });\n        const stats = {\n            totalAccounts: holders.length,\n            accountsAboveOne: holders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n        };\n        // Log some debug info\n        console.log(\"First 5 holders:\", formattedHolders.slice(0, 5).map((h)=>({\n                account: h.account,\n                balance: formatBalance(h.balance, decimals),\n                percentage: h.percentage\n            })));\n        return {\n            holders: formattedHolders,\n            stats\n        };\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token holders:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\nasync function getAccountInfo(accountId) {\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/accounts/\").concat(accountId));\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching account info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n// Helper function to format raw balance with decimals\nfunction formatBalance(balance, decimals) {\n    const balanceBN = BigInt(balance);\n    const divisor = BigInt(10 ** decimals);\n    const wholePart = balanceBN / divisor;\n    const fractionalPart = balanceBN % divisor;\n    let result = wholePart.toString();\n    if (fractionalPart > 0) {\n        let fractionalStr = fractionalPart.toString().padStart(decimals, \"0\");\n        while(fractionalStr.endsWith(\"0\")){\n            fractionalStr = fractionalStr.slice(0, -1);\n        }\n        if (fractionalStr.length > 0) {\n            result += \".\" + fractionalStr;\n        }\n    }\n    return result;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSXdCLGNBQWNiLE1BQU0sR0FBRyxHQUFHO1lBQzVCVyxVQUFVLE1BQU1FO1FBQ2xCO0lBQ0Y7SUFDQSxPQUFPRjtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9oZWRlcmEudHM/NmE5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBNSVJST1JfTk9ERV9VUkwgPSAnaHR0cHM6Ly9tYWlubmV0LXB1YmxpYy5taXJyb3Jub2RlLmhlZGVyYS5jb20vYXBpL3YxJztcblxuaW50ZXJmYWNlIFRva2VuSG9sZGVyIHtcbiAgYWNjb3VudDogc3RyaW5nO1xuICBiYWxhbmNlOiBzdHJpbmc7XG4gIHBlcmNlbnRhZ2U6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFRva2VuSG9sZGVyc1Jlc3BvbnNlIHtcbiAgaG9sZGVyczogVG9rZW5Ib2xkZXJbXTtcbiAgc3RhdHM6IHtcbiAgICB0b3RhbEFjY291bnRzOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgYWNjb3VudHNBYm92ZU9uZTogbnVtYmVyO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUb2tlbklkKHRva2VuSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFJlbW92ZSBhbnkgc3BhY2VzIGFuZCBjb252ZXJ0IHRvIGxvd2VyY2FzZVxuICB0b2tlbklkID0gdG9rZW5JZC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgXG4gIC8vIElmIGl0J3MgYWxyZWFkeSBpbiBzaGFyZC5yZWFsbS5udW0gZm9ybWF0LCByZXR1cm4gYXMgaXNcbiAgaWYgKHRva2VuSWQuaW5jbHVkZXMoJy4nKSkge1xuICAgIHJldHVybiB0b2tlbklkO1xuICB9XG4gIFxuICAvLyBJZiBpdCdzIGp1c3QgYSBudW1iZXIsIGNvbnZlcnQgdG8gMC4wLm51bWJlciBmb3JtYXRcbiAgaWYgKC9eXFxkKyQvLnRlc3QodG9rZW5JZCkpIHtcbiAgICByZXR1cm4gYDAuMC4ke3Rva2VuSWR9YDtcbiAgfVxuICBcbiAgcmV0dXJuIHRva2VuSWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkluZm8odG9rZW5JZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybWF0dGVkVG9rZW5JZCA9IGZvcm1hdFRva2VuSWQodG9rZW5JZCk7XG4gICAgY29uc3QgdXJsID0gYCR7TUlSUk9SX05PREVfVVJMfS90b2tlbnMvJHtmb3JtYXR0ZWRUb2tlbklkfWA7XG4gICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIHRva2VuIGluZm8gZnJvbTonLCB1cmwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybCk7XG4gICAgY29uc29sZS5sb2coJ1Rva2VuIEluZm8gUmVzcG9uc2U6JywgcmVzcG9uc2UuZGF0YSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b2tlbiBpbmZvOicsIHtcbiAgICAgIHN0YXR1czogZXJyb3IucmVzcG9uc2U/LnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogZXJyb3IucmVzcG9uc2U/LmRhdGEsXG4gICAgICB1cmw6IGVycm9yLmNvbmZpZz8udXJsXG4gICAgfSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgXG4gICAgICBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCB8fCBcbiAgICAgICdFcnJvciBmZXRjaGluZyB0b2tlbiBkYXRhJ1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VuSG9sZGVycyh0b2tlbklkOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSA1MCk6IFByb21pc2U8VG9rZW5Ib2xkZXJzUmVzcG9uc2U+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRUb2tlbklkID0gZm9ybWF0VG9rZW5JZCh0b2tlbklkKTtcbiAgICBjb25zdCB0b2tlbkluZm8gPSBhd2FpdCBnZXRUb2tlbkluZm8oZm9ybWF0dGVkVG9rZW5JZCk7XG4gICAgXG4gICAgLy8gR2V0IHRva2VuIGJhbGFuY2VzIGRpcmVjdGx5XG4gICAgY29uc3QgdXJsID0gYCR7TUlSUk9SX05PREVfVVJMfS90b2tlbnMvJHtmb3JtYXR0ZWRUb2tlbklkfS9iYWxhbmNlc2A7XG4gICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIHRva2VuIGJhbGFuY2VzIGZyb206JywgdXJsKTtcbiAgICBcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdCYWxhbmNlIFJlc3BvbnNlOicsIHJlc3BvbnNlLmRhdGEpO1xuXG4gICAgaWYgKCFyZXNwb25zZS5kYXRhLmJhbGFuY2VzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGJhbGFuY2UgZGF0YSBmb3VuZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGhvbGRlcnMgPSByZXNwb25zZS5kYXRhLmJhbGFuY2VzO1xuICAgIGNvbnN0IGRlY2ltYWxzID0gTnVtYmVyKHRva2VuSW5mby5kZWNpbWFscyk7XG4gICAgY29uc3Qgb25lVG9rZW4gPSBCaWdJbnQoMTAgKiogZGVjaW1hbHMpO1xuXG4gICAgLy8gU29ydCBob2xkZXJzIGJ5IGJhbGFuY2VcbiAgICBjb25zdCBzb3J0ZWRIb2xkZXJzID0gWy4uLmhvbGRlcnNdXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBjb25zdCBiYWxhbmNlQSA9IEJpZ0ludChhLmJhbGFuY2UpO1xuICAgICAgICBjb25zdCBiYWxhbmNlQiA9IEJpZ0ludChiLmJhbGFuY2UpO1xuICAgICAgICByZXR1cm4gYmFsYW5jZUIgPiBiYWxhbmNlQSA/IDEgOiBiYWxhbmNlQiA8IGJhbGFuY2VBID8gLTEgOiAwO1xuICAgICAgfSlcbiAgICAgIC5zbGljZSgwLCBsaW1pdCk7XG5cbiAgICBjb25zdCB0b3RhbFN1cHBseUJpZ0ludCA9IEJpZ0ludCh0b2tlbkluZm8udG90YWxfc3VwcGx5KTtcblxuICAgIGNvbnN0IGZvcm1hdHRlZEhvbGRlcnMgPSBzb3J0ZWRIb2xkZXJzLm1hcChob2xkZXIgPT4ge1xuICAgICAgY29uc3QgaG9sZGVyQmFsYW5jZSA9IEJpZ0ludChob2xkZXIuYmFsYW5jZSk7XG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gTnVtYmVyKChob2xkZXJCYWxhbmNlICogQmlnSW50KDEwMDAwMDApIC8gdG90YWxTdXBwbHlCaWdJbnQpKSAvIDEwMDAwO1xuICAgICAgXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2NvdW50OiBob2xkZXIuYWNjb3VudCxcbiAgICAgICAgYmFsYW5jZTogaG9sZGVyLmJhbGFuY2UsXG4gICAgICAgIHBlcmNlbnRhZ2VcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBzdGF0cyA9IHtcbiAgICAgIHRvdGFsQWNjb3VudHM6IGhvbGRlcnMubGVuZ3RoLFxuICAgICAgYWNjb3VudHNBYm92ZU9uZTogaG9sZGVycy5maWx0ZXIoaG9sZGVyID0+IEJpZ0ludChob2xkZXIuYmFsYW5jZSkgPj0gb25lVG9rZW4pLmxlbmd0aFxuICAgIH07XG5cbiAgICAvLyBMb2cgc29tZSBkZWJ1ZyBpbmZvXG4gICAgY29uc29sZS5sb2coJ0ZpcnN0IDUgaG9sZGVyczonLCBmb3JtYXR0ZWRIb2xkZXJzLnNsaWNlKDAsIDUpLm1hcChoID0+ICh7XG4gICAgICBhY2NvdW50OiBoLmFjY291bnQsXG4gICAgICBiYWxhbmNlOiBmb3JtYXRCYWxhbmNlKGguYmFsYW5jZSwgZGVjaW1hbHMpLFxuICAgICAgcGVyY2VudGFnZTogaC5wZXJjZW50YWdlXG4gICAgfSkpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBob2xkZXJzOiBmb3JtYXR0ZWRIb2xkZXJzLFxuICAgICAgc3RhdHNcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9rZW4gaG9sZGVyczonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY2NvdW50SW5mbyhhY2NvdW50SWQ6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke01JUlJPUl9OT0RFX1VSTH0vYWNjb3VudHMvJHthY2NvdW50SWR9YCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBhY2NvdW50IGluZm86Jywge1xuICAgICAgc3RhdHVzOiBlcnJvci5yZXNwb25zZT8uc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQsXG4gICAgICBkYXRhOiBlcnJvci5yZXNwb25zZT8uZGF0YSxcbiAgICAgIHVybDogZXJyb3IuY29uZmlnPy51cmxcbiAgICB9KTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZm9ybWF0IHJhdyBiYWxhbmNlIHdpdGggZGVjaW1hbHNcbmZ1bmN0aW9uIGZvcm1hdEJhbGFuY2UoYmFsYW5jZTogc3RyaW5nLCBkZWNpbWFsczogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgYmFsYW5jZUJOID0gQmlnSW50KGJhbGFuY2UpO1xuICBjb25zdCBkaXZpc29yID0gQmlnSW50KDEwICoqIGRlY2ltYWxzKTtcbiAgY29uc3Qgd2hvbGVQYXJ0ID0gYmFsYW5jZUJOIC8gZGl2aXNvcjtcbiAgY29uc3QgZnJhY3Rpb25hbFBhcnQgPSBiYWxhbmNlQk4gJSBkaXZpc29yO1xuICBcbiAgbGV0IHJlc3VsdCA9IHdob2xlUGFydC50b1N0cmluZygpO1xuICBpZiAoZnJhY3Rpb25hbFBhcnQgPiAwKSB7XG4gICAgbGV0IGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsUGFydC50b1N0cmluZygpLnBhZFN0YXJ0KGRlY2ltYWxzLCAnMCcpO1xuICAgIHdoaWxlIChmcmFjdGlvbmFsU3RyLmVuZHNXaXRoKCcwJykpIHtcbiAgICAgIGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsU3RyLnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgaWYgKGZyYWN0aW9uYWxTdHIubGVuZ3RoID4gMCkge1xuICAgICAgcmVzdWx0ICs9ICcuJyArIGZyYWN0aW9uYWxTdHI7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJNSVJST1JfTk9ERV9VUkwiLCJmb3JtYXRUb2tlbklkIiwidG9rZW5JZCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidGVzdCIsImdldFRva2VuSW5mbyIsImZvcm1hdHRlZFRva2VuSWQiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJnZXQiLCJkYXRhIiwiZXJyb3IiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiY29uZmlnIiwiRXJyb3IiLCJtZXNzYWdlIiwiZ2V0VG9rZW5Ib2xkZXJzIiwibGltaXQiLCJ0b2tlbkluZm8iLCJiYWxhbmNlcyIsImhvbGRlcnMiLCJkZWNpbWFscyIsIk51bWJlciIsIm9uZVRva2VuIiwiQmlnSW50Iiwic29ydGVkSG9sZGVycyIsInNvcnQiLCJhIiwiYiIsImJhbGFuY2VBIiwiYmFsYW5jZSIsImJhbGFuY2VCIiwic2xpY2UiLCJ0b3RhbFN1cHBseUJpZ0ludCIsInRvdGFsX3N1cHBseSIsImZvcm1hdHRlZEhvbGRlcnMiLCJtYXAiLCJob2xkZXIiLCJob2xkZXJCYWxhbmNlIiwicGVyY2VudGFnZSIsImFjY291bnQiLCJzdGF0cyIsInRvdGFsQWNjb3VudHMiLCJsZW5ndGgiLCJhY2NvdW50c0Fib3ZlT25lIiwiZmlsdGVyIiwiaCIsImZvcm1hdEJhbGFuY2UiLCJnZXRBY2NvdW50SW5mbyIsImFjY291bnRJZCIsImJhbGFuY2VCTiIsImRpdmlzb3IiLCJ3aG9sZVBhcnQiLCJmcmFjdGlvbmFsUGFydCIsInJlc3VsdCIsInRvU3RyaW5nIiwiZnJhY3Rpb25hbFN0ciIsInBhZFN0YXJ0IiwiZW5kc1dpdGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});