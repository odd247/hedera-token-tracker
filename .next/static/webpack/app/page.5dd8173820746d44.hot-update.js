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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst BASE_URL = \"https://mainnet-public.mirrornode.hedera.com\";\nconst API_PATH = \"/api/v1\";\nfunction formatTokenId(tokenId) {\n    // Remove any spaces and convert to lowercase\n    tokenId = tokenId.trim().toLowerCase();\n    // If it's already in shard.realm.num format, return as is\n    if (tokenId.includes(\".\")) {\n        return tokenId;\n    }\n    // If it's just a number, convert to 0.0.number format\n    if (/^\\d+$/.test(tokenId)) {\n        return \"0.0.\".concat(tokenId);\n    }\n    return tokenId;\n}\nasync function getTokenInfo(tokenId) {\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const url = \"\".concat(BASE_URL).concat(API_PATH, \"/tokens/\").concat(formattedTokenId);\n        console.log(\"Fetching token info from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Token Info Response:\", response.data);\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config, _error_response_data, _error_response3, _error_response4;\n        console.error(\"Error fetching token info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw new Error(((_error_response3 = error.response) === null || _error_response3 === void 0 ? void 0 : (_error_response_data = _error_response3.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || ((_error_response4 = error.response) === null || _error_response4 === void 0 ? void 0 : _error_response4.statusText) || \"Error fetching token data\");\n    }\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    try {\n        var _firstResponse_data_links, _firstResponse_data_links1;\n        const formattedTokenId = formatTokenId(tokenId);\n        const tokenInfo = await getTokenInfo(formattedTokenId);\n        console.log(\"Token Info:\", {\n            name: tokenInfo.name,\n            symbol: tokenInfo.symbol,\n            decimals: tokenInfo.decimals,\n            total_supply: tokenInfo.total_supply\n        });\n        // Use a Map to ensure unique accounts\n        const holdersMap = new Map();\n        let hasMore = true;\n        // Get first page with maximum limit\n        const fetchPage = async function() {\n            let nextLink = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;\n            const url = nextLink ? \"\".concat(BASE_URL).concat(nextLink) : \"\".concat(BASE_URL).concat(API_PATH, \"/tokens/\").concat(formattedTokenId, \"/balances?limit=100\");\n            console.log(\"Fetching balances from:\", url);\n            return axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        };\n        // Fetch first page\n        const firstResponse = await fetchPage();\n        let holders = firstResponse.data.balances.filter((h)=>h.balance !== \"0\" && BigInt(h.balance) > 0);\n        holders.forEach((h)=>holdersMap.set(h.account, h));\n        hasMore = !!((_firstResponse_data_links = firstResponse.data.links) === null || _firstResponse_data_links === void 0 ? void 0 : _firstResponse_data_links.next);\n        let nextLink = (_firstResponse_data_links1 = firstResponse.data.links) === null || _firstResponse_data_links1 === void 0 ? void 0 : _firstResponse_data_links1.next;\n        // Fetch remaining pages\n        let pageCount = 1;\n        const maxPages = 200; // Increased to 200 pages to get more holders\n        while(hasMore && pageCount < maxPages && nextLink){\n            try {\n                var _response_data_links;\n                console.log(\"Fetching page \".concat(pageCount + 1, \" using next link\"));\n                const response = await fetchPage(nextLink);\n                holders = response.data.balances.filter((h)=>h.balance !== \"0\" && BigInt(h.balance) > 0);\n                if (holders.length > 0) {\n                    holders.forEach((h)=>holdersMap.set(h.account, h));\n                    console.log(\"Found \".concat(holders.length, \" holders on page \").concat(pageCount + 1, \" (total unique: \").concat(holdersMap.size, \")\"));\n                } else {\n                    hasMore = false;\n                }\n                nextLink = (_response_data_links = response.data.links) === null || _response_data_links === void 0 ? void 0 : _response_data_links.next;\n                hasMore = hasMore && !!nextLink;\n                pageCount++;\n                // Add a small delay to avoid rate limiting\n                await new Promise((resolve)=>setTimeout(resolve, 100));\n            } catch (error) {\n                console.error(\"Error fetching page \".concat(pageCount + 1, \":\"), error);\n                hasMore = false;\n            }\n        }\n        // Convert Map back to array\n        const allHolders = Array.from(holdersMap.values());\n        console.log(\"Total unique holders fetched: \".concat(allHolders.length, \" from \").concat(pageCount, \" pages\"));\n        const decimals = Number(tokenInfo.decimals);\n        const oneToken = BigInt(10 ** decimals);\n        const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n        // Sort holders by numeric balance value\n        console.log(\"Sorting holders...\");\n        const sortedHolders = allHolders.map((holder)=>({\n                ...holder,\n                numericBalance: BigInt(holder.balance)\n            })).sort((a, b)=>{\n            return a.numericBalance > b.numericBalance ? -1 : a.numericBalance < b.numericBalance ? 1 : 0;\n        }).slice(0, limit);\n        const formattedHolders = sortedHolders.map((holder)=>{\n            const percentage = Number(holder.numericBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n            return {\n                account: holder.account,\n                balance: holder.balance,\n                percentage\n            };\n        });\n        // Log top 20 holders with formatted balances for verification\n        console.log(\"Top holders:\", formattedHolders.slice(0, 20).map((h)=>({\n                account: h.account,\n                balance: formatBalance(h.balance, decimals),\n                percentage: h.percentage.toFixed(4) + \"%\"\n            })));\n        const stats = {\n            totalAccounts: allHolders.length + (hasMore ? \"+\" : \"\"),\n            accountsAboveOne: allHolders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n        };\n        return {\n            holders: formattedHolders,\n            stats\n        };\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token holders:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\nasync function getAccountInfo(accountId) {\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(BASE_URL).concat(API_PATH, \"/accounts/\").concat(accountId));\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching account info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n// Helper function to format raw balance with decimals\nfunction formatBalance(balance, decimals) {\n    try {\n        const balanceBN = BigInt(balance);\n        const divisor = BigInt(10 ** decimals);\n        const wholePart = balanceBN / divisor;\n        const fractionalPart = balanceBN % divisor;\n        let result = wholePart.toString();\n        if (fractionalPart > 0) {\n            let fractionalStr = fractionalPart.toString().padStart(decimals, \"0\");\n            // Keep all significant decimal places\n            while(fractionalStr.endsWith(\"0\")){\n                fractionalStr = fractionalStr.slice(0, -1);\n            }\n            if (fractionalStr.length > 0) {\n                result += \".\" + fractionalStr;\n            }\n        }\n        // Add thousand separators\n        const parts = result.split(\".\");\n        parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, \",\");\n        return parts.join(\".\");\n    } catch (error) {\n        console.error(\"Error formatting balance:\", error);\n        return balance;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF5QjtRQUNyRCxPQUFPRixNQUFNRyxJQUFJLENBQUM7SUFDcEIsRUFBRSxPQUFPekUsT0FBTztRQUNkTCxRQUFRSyxLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxPQUFPdUI7SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9oZWRlcmEudHM/NmE5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBCQVNFX1VSTCA9ICdodHRwczovL21haW5uZXQtcHVibGljLm1pcnJvcm5vZGUuaGVkZXJhLmNvbSc7XG5jb25zdCBBUElfUEFUSCA9ICcvYXBpL3YxJztcblxuZXhwb3J0IGludGVyZmFjZSBUb2tlbkhvbGRlciB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgYmFsYW5jZTogc3RyaW5nO1xuICBwZXJjZW50YWdlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5JbmZvIHtcbiAgbmFtZTogc3RyaW5nO1xuICBzeW1ib2w6IHN0cmluZztcbiAgZGVjaW1hbHM6IHN0cmluZztcbiAgdG90YWxfc3VwcGx5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5Ib2xkZXJzUmVzcG9uc2Uge1xuICBob2xkZXJzOiBUb2tlbkhvbGRlcltdO1xuICBzdGF0czoge1xuICAgIHRvdGFsQWNjb3VudHM6IHN0cmluZztcbiAgICBhY2NvdW50c0Fib3ZlT25lOiBudW1iZXI7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRva2VuSWQodG9rZW5JZDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gUmVtb3ZlIGFueSBzcGFjZXMgYW5kIGNvbnZlcnQgdG8gbG93ZXJjYXNlXG4gIHRva2VuSWQgPSB0b2tlbklkLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBcbiAgLy8gSWYgaXQncyBhbHJlYWR5IGluIHNoYXJkLnJlYWxtLm51bSBmb3JtYXQsIHJldHVybiBhcyBpc1xuICBpZiAodG9rZW5JZC5pbmNsdWRlcygnLicpKSB7XG4gICAgcmV0dXJuIHRva2VuSWQ7XG4gIH1cbiAgXG4gIC8vIElmIGl0J3MganVzdCBhIG51bWJlciwgY29udmVydCB0byAwLjAubnVtYmVyIGZvcm1hdFxuICBpZiAoL15cXGQrJC8udGVzdCh0b2tlbklkKSkge1xuICAgIHJldHVybiBgMC4wLiR7dG9rZW5JZH1gO1xuICB9XG4gIFxuICByZXR1cm4gdG9rZW5JZDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VuSW5mbyh0b2tlbklkOiBzdHJpbmcpOiBQcm9taXNlPFRva2VuSW5mbz4ge1xuICB0cnkge1xuICAgIGNvbnN0IGZvcm1hdHRlZFRva2VuSWQgPSBmb3JtYXRUb2tlbklkKHRva2VuSWQpO1xuICAgIGNvbnN0IHVybCA9IGAke0JBU0VfVVJMfSR7QVBJX1BBVEh9L3Rva2Vucy8ke2Zvcm1hdHRlZFRva2VuSWR9YDtcbiAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgdG9rZW4gaW5mbyBmcm9tOicsIHVybCk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodXJsKTtcbiAgICBjb25zb2xlLmxvZygnVG9rZW4gSW5mbyBSZXNwb25zZTonLCByZXNwb25zZS5kYXRhKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRva2VuIGluZm86Jywge1xuICAgICAgc3RhdHVzOiBlcnJvci5yZXNwb25zZT8uc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQsXG4gICAgICBkYXRhOiBlcnJvci5yZXNwb25zZT8uZGF0YSxcbiAgICAgIHVybDogZXJyb3IuY29uZmlnPy51cmxcbiAgICB9KTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCBcbiAgICAgIGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0IHx8IFxuICAgICAgJ0Vycm9yIGZldGNoaW5nIHRva2VuIGRhdGEnXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW5Ib2xkZXJzKHRva2VuSWQ6IHN0cmluZywgbGltaXQ6IG51bWJlciA9IDUwKTogUHJvbWlzZTxUb2tlbkhvbGRlcnNSZXNwb25zZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGZvcm1hdHRlZFRva2VuSWQgPSBmb3JtYXRUb2tlbklkKHRva2VuSWQpO1xuICAgIGNvbnN0IHRva2VuSW5mbyA9IGF3YWl0IGdldFRva2VuSW5mbyhmb3JtYXR0ZWRUb2tlbklkKTtcbiAgICBjb25zb2xlLmxvZygnVG9rZW4gSW5mbzonLCB7XG4gICAgICBuYW1lOiB0b2tlbkluZm8ubmFtZSxcbiAgICAgIHN5bWJvbDogdG9rZW5JbmZvLnN5bWJvbCxcbiAgICAgIGRlY2ltYWxzOiB0b2tlbkluZm8uZGVjaW1hbHMsXG4gICAgICB0b3RhbF9zdXBwbHk6IHRva2VuSW5mby50b3RhbF9zdXBwbHlcbiAgICB9KTtcbiAgICBcbiAgICAvLyBVc2UgYSBNYXAgdG8gZW5zdXJlIHVuaXF1ZSBhY2NvdW50c1xuICAgIGNvbnN0IGhvbGRlcnNNYXAgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuICAgIGxldCBoYXNNb3JlID0gdHJ1ZTtcbiAgICBcbiAgICAvLyBHZXQgZmlyc3QgcGFnZSB3aXRoIG1heGltdW0gbGltaXRcbiAgICBjb25zdCBmZXRjaFBhZ2UgPSBhc3luYyAobmV4dExpbms6IHN0cmluZyB8IG51bGwgPSBudWxsKSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBuZXh0TGluayA/IGAke0JBU0VfVVJMfSR7bmV4dExpbmt9YCA6IGAke0JBU0VfVVJMfSR7QVBJX1BBVEh9L3Rva2Vucy8ke2Zvcm1hdHRlZFRva2VuSWR9L2JhbGFuY2VzP2xpbWl0PTEwMGA7XG4gICAgICBjb25zb2xlLmxvZygnRmV0Y2hpbmcgYmFsYW5jZXMgZnJvbTonLCB1cmwpO1xuICAgICAgcmV0dXJuIGF4aW9zLmdldCh1cmwpO1xuICAgIH07XG5cbiAgICAvLyBGZXRjaCBmaXJzdCBwYWdlXG4gICAgY29uc3QgZmlyc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoUGFnZSgpO1xuICAgIGxldCBob2xkZXJzID0gZmlyc3RSZXNwb25zZS5kYXRhLmJhbGFuY2VzLmZpbHRlcigoaDogYW55KSA9PiBoLmJhbGFuY2UgIT09ICcwJyAmJiBCaWdJbnQoaC5iYWxhbmNlKSA+IDApO1xuICAgIGhvbGRlcnMuZm9yRWFjaChoID0+IGhvbGRlcnNNYXAuc2V0KGguYWNjb3VudCwgaCkpO1xuICAgIFxuICAgIGhhc01vcmUgPSAhIWZpcnN0UmVzcG9uc2UuZGF0YS5saW5rcz8ubmV4dDtcbiAgICBsZXQgbmV4dExpbmsgPSBmaXJzdFJlc3BvbnNlLmRhdGEubGlua3M/Lm5leHQ7XG5cbiAgICAvLyBGZXRjaCByZW1haW5pbmcgcGFnZXNcbiAgICBsZXQgcGFnZUNvdW50ID0gMTtcbiAgICBjb25zdCBtYXhQYWdlcyA9IDIwMDsgLy8gSW5jcmVhc2VkIHRvIDIwMCBwYWdlcyB0byBnZXQgbW9yZSBob2xkZXJzXG4gICAgXG4gICAgd2hpbGUgKGhhc01vcmUgJiYgcGFnZUNvdW50IDwgbWF4UGFnZXMgJiYgbmV4dExpbmspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBGZXRjaGluZyBwYWdlICR7cGFnZUNvdW50ICsgMX0gdXNpbmcgbmV4dCBsaW5rYCk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hQYWdlKG5leHRMaW5rKTtcbiAgICAgICAgaG9sZGVycyA9IHJlc3BvbnNlLmRhdGEuYmFsYW5jZXMuZmlsdGVyKChoOiBhbnkpID0+IGguYmFsYW5jZSAhPT0gJzAnICYmIEJpZ0ludChoLmJhbGFuY2UpID4gMCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoaG9sZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaG9sZGVycy5mb3JFYWNoKGggPT4gaG9sZGVyc01hcC5zZXQoaC5hY2NvdW50LCBoKSk7XG4gICAgICAgICAgY29uc29sZS5sb2coYEZvdW5kICR7aG9sZGVycy5sZW5ndGh9IGhvbGRlcnMgb24gcGFnZSAke3BhZ2VDb3VudCArIDF9ICh0b3RhbCB1bmlxdWU6ICR7aG9sZGVyc01hcC5zaXplfSlgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYXNNb3JlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG5leHRMaW5rID0gcmVzcG9uc2UuZGF0YS5saW5rcz8ubmV4dDtcbiAgICAgICAgaGFzTW9yZSA9IGhhc01vcmUgJiYgISFuZXh0TGluaztcbiAgICAgICAgcGFnZUNvdW50Kys7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgYSBzbWFsbCBkZWxheSB0byBhdm9pZCByYXRlIGxpbWl0aW5nXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAxMDApKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIHBhZ2UgJHtwYWdlQ291bnQgKyAxfTpgLCBlcnJvcik7XG4gICAgICAgIGhhc01vcmUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDb252ZXJ0IE1hcCBiYWNrIHRvIGFycmF5XG4gICAgY29uc3QgYWxsSG9sZGVycyA9IEFycmF5LmZyb20oaG9sZGVyc01hcC52YWx1ZXMoKSk7XG4gICAgY29uc29sZS5sb2coYFRvdGFsIHVuaXF1ZSBob2xkZXJzIGZldGNoZWQ6ICR7YWxsSG9sZGVycy5sZW5ndGh9IGZyb20gJHtwYWdlQ291bnR9IHBhZ2VzYCk7XG5cbiAgICBjb25zdCBkZWNpbWFscyA9IE51bWJlcih0b2tlbkluZm8uZGVjaW1hbHMpO1xuICAgIGNvbnN0IG9uZVRva2VuID0gQmlnSW50KDEwICoqIGRlY2ltYWxzKTtcbiAgICBjb25zdCB0b3RhbFN1cHBseUJpZ0ludCA9IEJpZ0ludCh0b2tlbkluZm8udG90YWxfc3VwcGx5KTtcblxuICAgIC8vIFNvcnQgaG9sZGVycyBieSBudW1lcmljIGJhbGFuY2UgdmFsdWVcbiAgICBjb25zb2xlLmxvZygnU29ydGluZyBob2xkZXJzLi4uJyk7XG4gICAgY29uc3Qgc29ydGVkSG9sZGVycyA9IGFsbEhvbGRlcnNcbiAgICAgIC5tYXAoaG9sZGVyID0+ICh7XG4gICAgICAgIC4uLmhvbGRlcixcbiAgICAgICAgbnVtZXJpY0JhbGFuY2U6IEJpZ0ludChob2xkZXIuYmFsYW5jZSlcbiAgICAgIH0pKVxuICAgICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgcmV0dXJuIGEubnVtZXJpY0JhbGFuY2UgPiBiLm51bWVyaWNCYWxhbmNlID8gLTEgOiBcbiAgICAgICAgICAgICAgIGEubnVtZXJpY0JhbGFuY2UgPCBiLm51bWVyaWNCYWxhbmNlID8gMSA6IDA7XG4gICAgICB9KVxuICAgICAgLnNsaWNlKDAsIGxpbWl0KTtcblxuICAgIGNvbnN0IGZvcm1hdHRlZEhvbGRlcnMgPSBzb3J0ZWRIb2xkZXJzLm1hcChob2xkZXIgPT4ge1xuICAgICAgY29uc3QgcGVyY2VudGFnZSA9IE51bWJlcigoaG9sZGVyLm51bWVyaWNCYWxhbmNlICogQmlnSW50KDEwMDAwMDApIC8gdG90YWxTdXBwbHlCaWdJbnQpKSAvIDEwMDAwO1xuICAgICAgXG4gICAgICByZXR1cm4ge1xuICAgICAgICBhY2NvdW50OiBob2xkZXIuYWNjb3VudCxcbiAgICAgICAgYmFsYW5jZTogaG9sZGVyLmJhbGFuY2UsXG4gICAgICAgIHBlcmNlbnRhZ2VcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBMb2cgdG9wIDIwIGhvbGRlcnMgd2l0aCBmb3JtYXR0ZWQgYmFsYW5jZXMgZm9yIHZlcmlmaWNhdGlvblxuICAgIGNvbnNvbGUubG9nKCdUb3AgaG9sZGVyczonLCBmb3JtYXR0ZWRIb2xkZXJzLnNsaWNlKDAsIDIwKS5tYXAoaCA9PiAoe1xuICAgICAgYWNjb3VudDogaC5hY2NvdW50LFxuICAgICAgYmFsYW5jZTogZm9ybWF0QmFsYW5jZShoLmJhbGFuY2UsIGRlY2ltYWxzKSxcbiAgICAgIHBlcmNlbnRhZ2U6IGgucGVyY2VudGFnZS50b0ZpeGVkKDQpICsgJyUnXG4gICAgfSkpKTtcblxuICAgIGNvbnN0IHN0YXRzID0ge1xuICAgICAgdG90YWxBY2NvdW50czogYWxsSG9sZGVycy5sZW5ndGggKyAoaGFzTW9yZSA/ICcrJyA6ICcnKSxcbiAgICAgIGFjY291bnRzQWJvdmVPbmU6IGFsbEhvbGRlcnMuZmlsdGVyKGhvbGRlciA9PiBCaWdJbnQoaG9sZGVyLmJhbGFuY2UpID49IG9uZVRva2VuKS5sZW5ndGhcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhvbGRlcnM6IGZvcm1hdHRlZEhvbGRlcnMsXG4gICAgICBzdGF0c1xuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b2tlbiBob2xkZXJzOicsIHtcbiAgICAgIHN0YXR1czogZXJyb3IucmVzcG9uc2U/LnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXNUZXh0LFxuICAgICAgZGF0YTogZXJyb3IucmVzcG9uc2U/LmRhdGEsXG4gICAgICB1cmw6IGVycm9yLmNvbmZpZz8udXJsXG4gICAgfSk7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjY291bnRJbmZvKGFjY291bnRJZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoYCR7QkFTRV9VUkx9JHtBUElfUEFUSH0vYWNjb3VudHMvJHthY2NvdW50SWR9YCk7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBhY2NvdW50IGluZm86Jywge1xuICAgICAgc3RhdHVzOiBlcnJvci5yZXNwb25zZT8uc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQsXG4gICAgICBkYXRhOiBlcnJvci5yZXNwb25zZT8uZGF0YSxcbiAgICAgIHVybDogZXJyb3IuY29uZmlnPy51cmxcbiAgICB9KTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gZm9ybWF0IHJhdyBiYWxhbmNlIHdpdGggZGVjaW1hbHNcbmZ1bmN0aW9uIGZvcm1hdEJhbGFuY2UoYmFsYW5jZTogc3RyaW5nLCBkZWNpbWFsczogbnVtYmVyKTogc3RyaW5nIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYWxhbmNlQk4gPSBCaWdJbnQoYmFsYW5jZSk7XG4gICAgY29uc3QgZGl2aXNvciA9IEJpZ0ludCgxMCAqKiBkZWNpbWFscyk7XG4gICAgY29uc3Qgd2hvbGVQYXJ0ID0gYmFsYW5jZUJOIC8gZGl2aXNvcjtcbiAgICBjb25zdCBmcmFjdGlvbmFsUGFydCA9IGJhbGFuY2VCTiAlIGRpdmlzb3I7XG4gICAgXG4gICAgbGV0IHJlc3VsdCA9IHdob2xlUGFydC50b1N0cmluZygpO1xuICAgIGlmIChmcmFjdGlvbmFsUGFydCA+IDApIHtcbiAgICAgIGxldCBmcmFjdGlvbmFsU3RyID0gZnJhY3Rpb25hbFBhcnQudG9TdHJpbmcoKS5wYWRTdGFydChkZWNpbWFscywgJzAnKTtcbiAgICAgIC8vIEtlZXAgYWxsIHNpZ25pZmljYW50IGRlY2ltYWwgcGxhY2VzXG4gICAgICB3aGlsZSAoZnJhY3Rpb25hbFN0ci5lbmRzV2l0aCgnMCcpKSB7XG4gICAgICAgIGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsU3RyLnNsaWNlKDAsIC0xKTtcbiAgICAgIH1cbiAgICAgIGlmIChmcmFjdGlvbmFsU3RyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmVzdWx0ICs9ICcuJyArIGZyYWN0aW9uYWxTdHI7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIEFkZCB0aG91c2FuZCBzZXBhcmF0b3JzXG4gICAgY29uc3QgcGFydHMgPSByZXN1bHQuc3BsaXQoJy4nKTtcbiAgICBwYXJ0c1swXSA9IHBhcnRzWzBdLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcsJyk7XG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJy4nKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmb3JtYXR0aW5nIGJhbGFuY2U6JywgZXJyb3IpO1xuICAgIHJldHVybiBiYWxhbmNlO1xuICB9XG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJCQVNFX1VSTCIsIkFQSV9QQVRIIiwiZm9ybWF0VG9rZW5JZCIsInRva2VuSWQiLCJ0cmltIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInRlc3QiLCJnZXRUb2tlbkluZm8iLCJmb3JtYXR0ZWRUb2tlbklkIiwidXJsIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZ2V0IiwiZGF0YSIsImVycm9yIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsImNvbmZpZyIsIkVycm9yIiwibWVzc2FnZSIsImdldFRva2VuSG9sZGVycyIsImxpbWl0IiwiZmlyc3RSZXNwb25zZSIsInRva2VuSW5mbyIsIm5hbWUiLCJzeW1ib2wiLCJkZWNpbWFscyIsInRvdGFsX3N1cHBseSIsImhvbGRlcnNNYXAiLCJNYXAiLCJoYXNNb3JlIiwiZmV0Y2hQYWdlIiwibmV4dExpbmsiLCJob2xkZXJzIiwiYmFsYW5jZXMiLCJmaWx0ZXIiLCJoIiwiYmFsYW5jZSIsIkJpZ0ludCIsImZvckVhY2giLCJzZXQiLCJhY2NvdW50IiwibGlua3MiLCJuZXh0IiwicGFnZUNvdW50IiwibWF4UGFnZXMiLCJsZW5ndGgiLCJzaXplIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwiYWxsSG9sZGVycyIsIkFycmF5IiwiZnJvbSIsInZhbHVlcyIsIk51bWJlciIsIm9uZVRva2VuIiwidG90YWxTdXBwbHlCaWdJbnQiLCJzb3J0ZWRIb2xkZXJzIiwibWFwIiwiaG9sZGVyIiwibnVtZXJpY0JhbGFuY2UiLCJzb3J0IiwiYSIsImIiLCJzbGljZSIsImZvcm1hdHRlZEhvbGRlcnMiLCJwZXJjZW50YWdlIiwiZm9ybWF0QmFsYW5jZSIsInRvRml4ZWQiLCJzdGF0cyIsInRvdGFsQWNjb3VudHMiLCJhY2NvdW50c0Fib3ZlT25lIiwiZ2V0QWNjb3VudEluZm8iLCJhY2NvdW50SWQiLCJiYWxhbmNlQk4iLCJkaXZpc29yIiwid2hvbGVQYXJ0IiwiZnJhY3Rpb25hbFBhcnQiLCJyZXN1bHQiLCJ0b1N0cmluZyIsImZyYWN0aW9uYWxTdHIiLCJwYWRTdGFydCIsImVuZHNXaXRoIiwicGFydHMiLCJzcGxpdCIsInJlcGxhY2UiLCJqb2luIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});