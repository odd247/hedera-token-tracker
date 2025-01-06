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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst MIRROR_NODE_URL = \"https://mainnet-public.mirrornode.hedera.com/api/v1\";\nfunction formatTokenId(tokenId) {\n    // Remove any spaces and convert to lowercase\n    tokenId = tokenId.trim().toLowerCase();\n    // If it's already in shard.realm.num format, return as is\n    if (tokenId.includes(\".\")) {\n        return tokenId;\n    }\n    // If it's just a number, convert to 0.0.number format\n    if (/^\\d+$/.test(tokenId)) {\n        return \"0.0.\".concat(tokenId);\n    }\n    return tokenId;\n}\nasync function getTokenInfo(tokenId) {\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const url = \"\".concat(MIRROR_NODE_URL, \"/tokens/\").concat(formattedTokenId);\n        console.log(\"Fetching token info from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Token Info Response:\", response.data);\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config, _error_response_data, _error_response3, _error_response4;\n        console.error(\"Error fetching token info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw new Error(((_error_response3 = error.response) === null || _error_response3 === void 0 ? void 0 : (_error_response_data = _error_response3.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || ((_error_response4 = error.response) === null || _error_response4 === void 0 ? void 0 : _error_response4.statusText) || \"Error fetching token data\");\n    }\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    try {\n        var _firstResponse_data_links;\n        const formattedTokenId = formatTokenId(tokenId);\n        const tokenInfo = await getTokenInfo(formattedTokenId);\n        console.log(\"Token Info:\", {\n            name: tokenInfo.name,\n            symbol: tokenInfo.symbol,\n            decimals: tokenInfo.decimals,\n            total_supply: tokenInfo.total_supply\n        });\n        let allHolders = [];\n        let nextLink = null;\n        // Fetch first page\n        const url = \"\".concat(MIRROR_NODE_URL, \"/tokens/\").concat(formattedTokenId, \"/balances\");\n        console.log(\"Fetching token balances from:\", url);\n        const firstResponse = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url, {\n            params: {\n                limit: 100,\n                order: \"desc\"\n            }\n        });\n        allHolders = [\n            ...firstResponse.data.balances\n        ];\n        nextLink = (_firstResponse_data_links = firstResponse.data.links) === null || _firstResponse_data_links === void 0 ? void 0 : _firstResponse_data_links.next;\n        // Fetch up to 5 more pages to ensure we have the largest holders\n        let pageCount = 1;\n        while(nextLink && pageCount < 5){\n            var _nextResponse_data_links;\n            console.log(\"Fetching page \".concat(pageCount + 1, \"...\"));\n            const nextResponse = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL).concat(nextLink));\n            allHolders = [\n                ...allHolders,\n                ...nextResponse.data.balances\n            ];\n            nextLink = (_nextResponse_data_links = nextResponse.data.links) === null || _nextResponse_data_links === void 0 ? void 0 : _nextResponse_data_links.next;\n            pageCount++;\n        }\n        console.log(\"Total holders fetched: \".concat(allHolders.length));\n        const decimals = Number(tokenInfo.decimals);\n        const oneToken = BigInt(10 ** decimals);\n        const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n        // Sort all holders by balance\n        const sortedHolders = allHolders.sort((a, b)=>{\n            const balanceA = BigInt(a.balance);\n            const balanceB = BigInt(b.balance);\n            return balanceB > balanceA ? 1 : balanceB < balanceA ? -1 : 0;\n        }).slice(0, limit);\n        const formattedHolders = sortedHolders.map((holder)=>{\n            const holderBalance = BigInt(holder.balance);\n            const percentage = Number(holderBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n            return {\n                account: holder.account,\n                balance: holder.balance,\n                percentage\n            };\n        });\n        // Log top 5 holders with raw and formatted balances\n        console.log(\"Top 5 holders:\", formattedHolders.slice(0, 5).map((h)=>({\n                account: h.account,\n                rawBalance: h.balance,\n                formattedBalance: formatBalance(h.balance, decimals),\n                percentage: h.percentage.toFixed(4) + \"%\"\n            })));\n        const stats = {\n            totalAccounts: allHolders.length + (nextLink ? \"+\" : \"\"),\n            accountsAboveOne: allHolders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n        };\n        return {\n            holders: formattedHolders,\n            stats\n        };\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token holders:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\nasync function getAccountInfo(accountId) {\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/accounts/\").concat(accountId));\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching account info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n// Helper function to format raw balance with decimals\nfunction formatBalance(balance, decimals) {\n    try {\n        const balanceBN = BigInt(balance);\n        const divisor = BigInt(10 ** decimals);\n        const wholePart = balanceBN / divisor;\n        const fractionalPart = balanceBN % divisor;\n        let result = wholePart.toString();\n        if (fractionalPart > 0) {\n            let fractionalStr = fractionalPart.toString().padStart(decimals, \"0\");\n            // Keep all significant decimal places\n            while(fractionalStr.endsWith(\"0\")){\n                fractionalStr = fractionalStr.slice(0, -1);\n            }\n            if (fractionalStr.length > 0) {\n                result += \".\" + fractionalStr;\n            }\n        }\n        // Add thousand separators\n        const parts = result.split(\".\");\n        parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, \",\");\n        return parts.join(\".\");\n    } catch (error) {\n        console.error(\"Error formatting balance:\", error);\n        return balance;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsNkJBQTZCQTtRQUMzQyxPQUFPaUM7SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9oZWRlcmEudHM/NmE5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBNSVJST1JfTk9ERV9VUkwgPSAnaHR0cHM6Ly9tYWlubmV0LXB1YmxpYy5taXJyb3Jub2RlLmhlZGVyYS5jb20vYXBpL3YxJztcblxuaW50ZXJmYWNlIFRva2VuSG9sZGVyIHtcbiAgYWNjb3VudDogc3RyaW5nO1xuICBiYWxhbmNlOiBzdHJpbmc7XG4gIHBlcmNlbnRhZ2U6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFRva2VuSG9sZGVyc1Jlc3BvbnNlIHtcbiAgaG9sZGVyczogVG9rZW5Ib2xkZXJbXTtcbiAgc3RhdHM6IHtcbiAgICB0b3RhbEFjY291bnRzOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgYWNjb3VudHNBYm92ZU9uZTogbnVtYmVyO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUb2tlbklkKHRva2VuSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFJlbW92ZSBhbnkgc3BhY2VzIGFuZCBjb252ZXJ0IHRvIGxvd2VyY2FzZVxuICB0b2tlbklkID0gdG9rZW5JZC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgXG4gIC8vIElmIGl0J3MgYWxyZWFkeSBpbiBzaGFyZC5yZWFsbS5udW0gZm9ybWF0LCByZXR1cm4gYXMgaXNcbiAgaWYgKHRva2VuSWQuaW5jbHVkZXMoJy4nKSkge1xuICAgIHJldHVybiB0b2tlbklkO1xuICB9XG4gIFxuICAvLyBJZiBpdCdzIGp1c3QgYSBudW1iZXIsIGNvbnZlcnQgdG8gMC4wLm51bWJlciBmb3JtYXRcbiAgaWYgKC9eXFxkKyQvLnRlc3QodG9rZW5JZCkpIHtcbiAgICByZXR1cm4gYDAuMC4ke3Rva2VuSWR9YDtcbiAgfVxuICBcbiAgcmV0dXJuIHRva2VuSWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkluZm8odG9rZW5JZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybWF0dGVkVG9rZW5JZCA9IGZvcm1hdFRva2VuSWQodG9rZW5JZCk7XG4gICAgY29uc3QgdXJsID0gYCR7TUlSUk9SX05PREVfVVJMfS90b2tlbnMvJHtmb3JtYXR0ZWRUb2tlbklkfWA7XG4gICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIHRva2VuIGluZm8gZnJvbTonLCB1cmwpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybCk7XG4gICAgY29uc29sZS5sb2coJ1Rva2VuIEluZm8gUmVzcG9uc2U6JywgcmVzcG9uc2UuZGF0YSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b2tlbiBpbmZvOicsIHtcbiAgICAgIHN0YXR1czogZXJyb3IucmVzcG9uc2U/LnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogZXJyb3IucmVzcG9uc2U/LmRhdGEsXG4gICAgICB1cmw6IGVycm9yLmNvbmZpZz8udXJsXG4gICAgfSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHwgXG4gICAgICBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCB8fCBcbiAgICAgICdFcnJvciBmZXRjaGluZyB0b2tlbiBkYXRhJ1xuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VuSG9sZGVycyh0b2tlbklkOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSA1MCk6IFByb21pc2U8VG9rZW5Ib2xkZXJzUmVzcG9uc2U+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmb3JtYXR0ZWRUb2tlbklkID0gZm9ybWF0VG9rZW5JZCh0b2tlbklkKTtcbiAgICBjb25zdCB0b2tlbkluZm8gPSBhd2FpdCBnZXRUb2tlbkluZm8oZm9ybWF0dGVkVG9rZW5JZCk7XG4gICAgY29uc29sZS5sb2coJ1Rva2VuIEluZm86Jywge1xuICAgICAgbmFtZTogdG9rZW5JbmZvLm5hbWUsXG4gICAgICBzeW1ib2w6IHRva2VuSW5mby5zeW1ib2wsXG4gICAgICBkZWNpbWFsczogdG9rZW5JbmZvLmRlY2ltYWxzLFxuICAgICAgdG90YWxfc3VwcGx5OiB0b2tlbkluZm8udG90YWxfc3VwcGx5XG4gICAgfSk7XG4gICAgXG4gICAgbGV0IGFsbEhvbGRlcnM6IGFueVtdID0gW107XG4gICAgbGV0IG5leHRMaW5rID0gbnVsbDtcbiAgICBcbiAgICAvLyBGZXRjaCBmaXJzdCBwYWdlXG4gICAgY29uc3QgdXJsID0gYCR7TUlSUk9SX05PREVfVVJMfS90b2tlbnMvJHtmb3JtYXR0ZWRUb2tlbklkfS9iYWxhbmNlc2A7XG4gICAgY29uc29sZS5sb2coJ0ZldGNoaW5nIHRva2VuIGJhbGFuY2VzIGZyb206JywgdXJsKTtcbiAgICBcbiAgICBjb25zdCBmaXJzdFJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybCwge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIGxpbWl0OiAxMDAsXG4gICAgICAgIG9yZGVyOiAnZGVzYydcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBhbGxIb2xkZXJzID0gWy4uLmZpcnN0UmVzcG9uc2UuZGF0YS5iYWxhbmNlc107XG4gICAgbmV4dExpbmsgPSBmaXJzdFJlc3BvbnNlLmRhdGEubGlua3M/Lm5leHQ7XG5cbiAgICAvLyBGZXRjaCB1cCB0byA1IG1vcmUgcGFnZXMgdG8gZW5zdXJlIHdlIGhhdmUgdGhlIGxhcmdlc3QgaG9sZGVyc1xuICAgIGxldCBwYWdlQ291bnQgPSAxO1xuICAgIHdoaWxlIChuZXh0TGluayAmJiBwYWdlQ291bnQgPCA1KSB7XG4gICAgICBjb25zb2xlLmxvZyhgRmV0Y2hpbmcgcGFnZSAke3BhZ2VDb3VudCArIDF9Li4uYCk7XG4gICAgICBjb25zdCBuZXh0UmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYCR7TUlSUk9SX05PREVfVVJMfSR7bmV4dExpbmt9YCk7XG4gICAgICBhbGxIb2xkZXJzID0gWy4uLmFsbEhvbGRlcnMsIC4uLm5leHRSZXNwb25zZS5kYXRhLmJhbGFuY2VzXTtcbiAgICAgIG5leHRMaW5rID0gbmV4dFJlc3BvbnNlLmRhdGEubGlua3M/Lm5leHQ7XG4gICAgICBwYWdlQ291bnQrKztcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgVG90YWwgaG9sZGVycyBmZXRjaGVkOiAke2FsbEhvbGRlcnMubGVuZ3RofWApO1xuXG4gICAgY29uc3QgZGVjaW1hbHMgPSBOdW1iZXIodG9rZW5JbmZvLmRlY2ltYWxzKTtcbiAgICBjb25zdCBvbmVUb2tlbiA9IEJpZ0ludCgxMCAqKiBkZWNpbWFscyk7XG4gICAgY29uc3QgdG90YWxTdXBwbHlCaWdJbnQgPSBCaWdJbnQodG9rZW5JbmZvLnRvdGFsX3N1cHBseSk7XG5cbiAgICAvLyBTb3J0IGFsbCBob2xkZXJzIGJ5IGJhbGFuY2VcbiAgICBjb25zdCBzb3J0ZWRIb2xkZXJzID0gYWxsSG9sZGVyc1xuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgY29uc3QgYmFsYW5jZUEgPSBCaWdJbnQoYS5iYWxhbmNlKTtcbiAgICAgICAgY29uc3QgYmFsYW5jZUIgPSBCaWdJbnQoYi5iYWxhbmNlKTtcbiAgICAgICAgcmV0dXJuIGJhbGFuY2VCID4gYmFsYW5jZUEgPyAxIDogYmFsYW5jZUIgPCBiYWxhbmNlQSA/IC0xIDogMDtcbiAgICAgIH0pXG4gICAgICAuc2xpY2UoMCwgbGltaXQpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkSG9sZGVycyA9IHNvcnRlZEhvbGRlcnMubWFwKGhvbGRlciA9PiB7XG4gICAgICBjb25zdCBob2xkZXJCYWxhbmNlID0gQmlnSW50KGhvbGRlci5iYWxhbmNlKTtcbiAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBOdW1iZXIoKGhvbGRlckJhbGFuY2UgKiBCaWdJbnQoMTAwMDAwMCkgLyB0b3RhbFN1cHBseUJpZ0ludCkpIC8gMTAwMDA7XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnQ6IGhvbGRlci5hY2NvdW50LFxuICAgICAgICBiYWxhbmNlOiBob2xkZXIuYmFsYW5jZSxcbiAgICAgICAgcGVyY2VudGFnZVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIExvZyB0b3AgNSBob2xkZXJzIHdpdGggcmF3IGFuZCBmb3JtYXR0ZWQgYmFsYW5jZXNcbiAgICBjb25zb2xlLmxvZygnVG9wIDUgaG9sZGVyczonLCBmb3JtYXR0ZWRIb2xkZXJzLnNsaWNlKDAsIDUpLm1hcChoID0+ICh7XG4gICAgICBhY2NvdW50OiBoLmFjY291bnQsXG4gICAgICByYXdCYWxhbmNlOiBoLmJhbGFuY2UsXG4gICAgICBmb3JtYXR0ZWRCYWxhbmNlOiBmb3JtYXRCYWxhbmNlKGguYmFsYW5jZSwgZGVjaW1hbHMpLFxuICAgICAgcGVyY2VudGFnZTogaC5wZXJjZW50YWdlLnRvRml4ZWQoNCkgKyAnJSdcbiAgICB9KSkpO1xuXG4gICAgY29uc3Qgc3RhdHMgPSB7XG4gICAgICB0b3RhbEFjY291bnRzOiBhbGxIb2xkZXJzLmxlbmd0aCArIChuZXh0TGluayA/ICcrJyA6ICcnKSxcbiAgICAgIGFjY291bnRzQWJvdmVPbmU6IGFsbEhvbGRlcnMuZmlsdGVyKGhvbGRlciA9PiBCaWdJbnQoaG9sZGVyLmJhbGFuY2UpID49IG9uZVRva2VuKS5sZW5ndGhcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhvbGRlcnM6IGZvcm1hdHRlZEhvbGRlcnMsXG4gICAgICBzdGF0c1xuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b2tlbiBob2xkZXJzOicsIHtcbiAgICAgIHN0YXR1czogZXJyb3IucmVzcG9uc2U/LnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogZXJyb3IucmVzcG9uc2U/LmRhdGEsXG4gICAgICB1cmw6IGVycm9yLmNvbmZpZz8udXJsXG4gICAgfSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnRJbmZvKGFjY291bnRJZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYCR7TUlSUk9SX05PREVfVVJMfS9hY2NvdW50cy8ke2FjY291bnRJZH1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGFjY291bnQgaW5mbzonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBmb3JtYXQgcmF3IGJhbGFuY2Ugd2l0aCBkZWNpbWFsc1xuZnVuY3Rpb24gZm9ybWF0QmFsYW5jZShiYWxhbmNlOiBzdHJpbmcsIGRlY2ltYWxzOiBudW1iZXIpOiBzdHJpbmcge1xuICB0cnkge1xuICAgIGNvbnN0IGJhbGFuY2VCTiA9IEJpZ0ludChiYWxhbmNlKTtcbiAgICBjb25zdCBkaXZpc29yID0gQmlnSW50KDEwICoqIGRlY2ltYWxzKTtcbiAgICBjb25zdCB3aG9sZVBhcnQgPSBiYWxhbmNlQk4gLyBkaXZpc29yO1xuICAgIGNvbnN0IGZyYWN0aW9uYWxQYXJ0ID0gYmFsYW5jZUJOICUgZGl2aXNvcjtcbiAgICBcbiAgICBsZXQgcmVzdWx0ID0gd2hvbGVQYXJ0LnRvU3RyaW5nKCk7XG4gICAgaWYgKGZyYWN0aW9uYWxQYXJ0ID4gMCkge1xuICAgICAgbGV0IGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsUGFydC50b1N0cmluZygpLnBhZFN0YXJ0KGRlY2ltYWxzLCAnMCcpO1xuICAgICAgLy8gS2VlcCBhbGwgc2lnbmlmaWNhbnQgZGVjaW1hbCBwbGFjZXNcbiAgICAgIHdoaWxlIChmcmFjdGlvbmFsU3RyLmVuZHNXaXRoKCcwJykpIHtcbiAgICAgICAgZnJhY3Rpb25hbFN0ciA9IGZyYWN0aW9uYWxTdHIuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgICAgaWYgKGZyYWN0aW9uYWxTdHIubGVuZ3RoID4gMCkge1xuICAgICAgICByZXN1bHQgKz0gJy4nICsgZnJhY3Rpb25hbFN0cjtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQWRkIHRob3VzYW5kIHNlcGFyYXRvcnNcbiAgICBjb25zdCBwYXJ0cyA9IHJlc3VsdC5zcGxpdCgnLicpO1xuICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcbiAgICByZXR1cm4gcGFydHMuam9pbignLicpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZvcm1hdHRpbmcgYmFsYW5jZTonLCBlcnJvcik7XG4gICAgcmV0dXJuIGJhbGFuY2U7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsIk1JUlJPUl9OT0RFX1VSTCIsImZvcm1hdFRva2VuSWQiLCJ0b2tlbklkIiwidHJpbSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ0ZXN0IiwiZ2V0VG9rZW5JbmZvIiwiZm9ybWF0dGVkVG9rZW5JZCIsInVybCIsImNvbnNvbGUiLCJsb2ciLCJyZXNwb25zZSIsImdldCIsImRhdGEiLCJlcnJvciIsInN0YXR1cyIsInN0YXR1c1RleHQiLCJjb25maWciLCJFcnJvciIsIm1lc3NhZ2UiLCJnZXRUb2tlbkhvbGRlcnMiLCJsaW1pdCIsImZpcnN0UmVzcG9uc2UiLCJ0b2tlbkluZm8iLCJuYW1lIiwic3ltYm9sIiwiZGVjaW1hbHMiLCJ0b3RhbF9zdXBwbHkiLCJhbGxIb2xkZXJzIiwibmV4dExpbmsiLCJwYXJhbXMiLCJvcmRlciIsImJhbGFuY2VzIiwibGlua3MiLCJuZXh0IiwicGFnZUNvdW50IiwibmV4dFJlc3BvbnNlIiwibGVuZ3RoIiwiTnVtYmVyIiwib25lVG9rZW4iLCJCaWdJbnQiLCJ0b3RhbFN1cHBseUJpZ0ludCIsInNvcnRlZEhvbGRlcnMiLCJzb3J0IiwiYSIsImIiLCJiYWxhbmNlQSIsImJhbGFuY2UiLCJiYWxhbmNlQiIsInNsaWNlIiwiZm9ybWF0dGVkSG9sZGVycyIsIm1hcCIsImhvbGRlciIsImhvbGRlckJhbGFuY2UiLCJwZXJjZW50YWdlIiwiYWNjb3VudCIsImgiLCJyYXdCYWxhbmNlIiwiZm9ybWF0dGVkQmFsYW5jZSIsImZvcm1hdEJhbGFuY2UiLCJ0b0ZpeGVkIiwic3RhdHMiLCJ0b3RhbEFjY291bnRzIiwiYWNjb3VudHNBYm92ZU9uZSIsImZpbHRlciIsImhvbGRlcnMiLCJnZXRBY2NvdW50SW5mbyIsImFjY291bnRJZCIsImJhbGFuY2VCTiIsImRpdmlzb3IiLCJ3aG9sZVBhcnQiLCJmcmFjdGlvbmFsUGFydCIsInJlc3VsdCIsInRvU3RyaW5nIiwiZnJhY3Rpb25hbFN0ciIsInBhZFN0YXJ0IiwiZW5kc1dpdGgiLCJwYXJ0cyIsInNwbGl0IiwicmVwbGFjZSIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});