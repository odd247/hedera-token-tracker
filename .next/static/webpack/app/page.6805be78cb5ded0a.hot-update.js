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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst BASE_URL = \"https://mainnet-public.mirrornode.hedera.com\";\nconst API_PATH = \"/api/v1\";\nfunction formatTokenId(tokenId) {\n    // Remove any spaces and convert to lowercase\n    tokenId = tokenId.trim().toLowerCase();\n    // If it's already in shard.realm.num format, return as is\n    if (tokenId.includes(\".\")) {\n        return tokenId;\n    }\n    // If it's just a number, convert to 0.0.number format\n    if (/^\\d+$/.test(tokenId)) {\n        return \"0.0.\".concat(tokenId);\n    }\n    return tokenId;\n}\nasync function getTokenInfo(tokenId) {\n    try {\n        const formattedTokenId = formatTokenId(tokenId);\n        const url = \"\".concat(BASE_URL).concat(API_PATH, \"/tokens/\").concat(formattedTokenId);\n        console.log(\"Fetching token info from:\", url);\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        console.log(\"Token Info Response:\", response.data);\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config, _error_response_data, _error_response3, _error_response4;\n        console.error(\"Error fetching token info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw new Error(((_error_response3 = error.response) === null || _error_response3 === void 0 ? void 0 : (_error_response_data = _error_response3.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || ((_error_response4 = error.response) === null || _error_response4 === void 0 ? void 0 : _error_response4.statusText) || \"Error fetching token data\");\n    }\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    try {\n        var _firstResponse_data_links, _firstResponse_data_links1;\n        const formattedTokenId = formatTokenId(tokenId);\n        const tokenInfo = await getTokenInfo(formattedTokenId);\n        console.log(\"Token Info:\", {\n            name: tokenInfo.name,\n            symbol: tokenInfo.symbol,\n            decimals: tokenInfo.decimals,\n            total_supply: tokenInfo.total_supply\n        });\n        // Use a Map to ensure unique accounts\n        const holdersMap = new Map();\n        let hasMore = true;\n        // Get first page with maximum limit\n        const fetchPage = async function() {\n            let nextLink = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;\n            const url = nextLink ? \"\".concat(BASE_URL).concat(nextLink) : \"\".concat(BASE_URL).concat(API_PATH, \"/tokens/\").concat(formattedTokenId, \"/balances?limit=100\");\n            console.log(\"Fetching balances from:\", url);\n            return axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(url);\n        };\n        // Fetch first page\n        const firstResponse = await fetchPage();\n        let holders = firstResponse.data.balances.filter((h)=>h.balance !== \"0\" && BigInt(h.balance) > 0);\n        holders.forEach((h)=>holdersMap.set(h.account, h));\n        hasMore = !!((_firstResponse_data_links = firstResponse.data.links) === null || _firstResponse_data_links === void 0 ? void 0 : _firstResponse_data_links.next);\n        let nextLink = (_firstResponse_data_links1 = firstResponse.data.links) === null || _firstResponse_data_links1 === void 0 ? void 0 : _firstResponse_data_links1.next;\n        // Fetch remaining pages\n        let pageCount = 1;\n        const maxPages = 200; // Increased to 200 pages to get more holders\n        while(hasMore && pageCount < maxPages && nextLink){\n            try {\n                var _response_data_links;\n                console.log(\"Fetching page \".concat(pageCount + 1, \" using next link\"));\n                const response = await fetchPage(nextLink);\n                holders = response.data.balances.filter((h)=>h.balance !== \"0\" && BigInt(h.balance) > 0);\n                if (holders.length > 0) {\n                    holders.forEach((h)=>holdersMap.set(h.account, h));\n                    console.log(\"Found \".concat(holders.length, \" holders on page \").concat(pageCount + 1, \" (total unique: \").concat(holdersMap.size, \")\"));\n                } else {\n                    hasMore = false;\n                }\n                nextLink = (_response_data_links = response.data.links) === null || _response_data_links === void 0 ? void 0 : _response_data_links.next;\n                hasMore = hasMore && !!nextLink;\n                pageCount++;\n                // Add a small delay to avoid rate limiting\n                await new Promise((resolve)=>setTimeout(resolve, 100));\n            } catch (error) {\n                console.error(\"Error fetching page \".concat(pageCount + 1, \":\"), error);\n                hasMore = false;\n            }\n        }\n        // Convert Map back to array\n        const allHolders = Array.from(holdersMap.values());\n        console.log(\"Total unique holders fetched: \".concat(allHolders.length, \" from \").concat(pageCount, \" pages\"));\n        const decimals = Number(tokenInfo.decimals);\n        const oneToken = BigInt(10 ** decimals);\n        const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n        // Sort holders by numeric balance value\n        console.log(\"Sorting holders...\");\n        const sortedHolders = allHolders.map((holder)=>({\n                ...holder,\n                numericBalance: BigInt(holder.balance)\n            })).sort((a, b)=>{\n            return a.numericBalance > b.numericBalance ? -1 : a.numericBalance < b.numericBalance ? 1 : 0;\n        }).slice(0, limit);\n        const formattedHolders = sortedHolders.map((holder)=>{\n            const percentage = Number(holder.numericBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n            return {\n                account: holder.account,\n                balance: holder.balance,\n                percentage\n            };\n        });\n        // Log top 20 holders with formatted balances for verification\n        console.log(\"Top holders:\", formattedHolders.slice(0, 20).map((h)=>({\n                account: h.account,\n                balance: formatBalance(h.balance, decimals),\n                percentage: h.percentage.toFixed(4) + \"%\"\n            })));\n        const stats = {\n            totalAccounts: allHolders.length + (hasMore ? \"+\" : \"\"),\n            accountsAboveOne: allHolders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n        };\n        return {\n            holders: formattedHolders,\n            stats\n        };\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching token holders:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\nasync function getAccountInfo(accountId) {\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(BASE_URL).concat(API_PATH, \"/accounts/\").concat(accountId));\n        return response.data;\n    } catch (error) {\n        var _error_response, _error_response1, _error_response2, _error_config;\n        console.error(\"Error fetching account info:\", {\n            status: (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status,\n            statusText: (_error_response1 = error.response) === null || _error_response1 === void 0 ? void 0 : _error_response1.statusText,\n            data: (_error_response2 = error.response) === null || _error_response2 === void 0 ? void 0 : _error_response2.data,\n            url: (_error_config = error.config) === null || _error_config === void 0 ? void 0 : _error_config.url\n        });\n        throw error;\n    }\n}\n// Helper function to format raw balance with decimals\nfunction formatBalance(balance, decimals) {\n    try {\n        const balanceBN = BigInt(balance);\n        const divisor = BigInt(10 ** decimals);\n        const wholePart = balanceBN / divisor;\n        const fractionalPart = balanceBN % divisor;\n        let result = wholePart.toString();\n        if (fractionalPart > 0) {\n            let fractionalStr = fractionalPart.toString().padStart(decimals, \"0\");\n            // Keep all significant decimal places\n            while(fractionalStr.endsWith(\"0\")){\n                fractionalStr = fractionalStr.slice(0, -1);\n            }\n            if (fractionalStr.length > 0) {\n                result += \".\" + fractionalStr;\n            }\n        }\n        // Add thousand separators\n        const parts = result.split(\".\");\n        parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, \",\");\n        return parts.join(\".\");\n    } catch (error) {\n        console.error(\"Error formatting balance:\", error);\n        return balance;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUF5QjtRQUNyRCxPQUFPRixNQUFNRyxJQUFJLENBQUM7SUFDcEIsRUFBRSxPQUFPekUsT0FBTztRQUNkTCxRQUFRSyxLQUFLLENBQUMsNkJBQTZCQTtRQUMzQyxPQUFPdUI7SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy91dGlscy9oZWRlcmEudHM/NmE5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5jb25zdCBCQVNFX1VSTCA9ICdodHRwczovL21haW5uZXQtcHVibGljLm1pcnJvcm5vZGUuaGVkZXJhLmNvbSc7XG5jb25zdCBBUElfUEFUSCA9ICcvYXBpL3YxJztcblxuaW50ZXJmYWNlIFRva2VuSG9sZGVyIHtcbiAgYWNjb3VudDogc3RyaW5nO1xuICBiYWxhbmNlOiBzdHJpbmc7XG4gIHBlcmNlbnRhZ2U6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIFRva2VuSG9sZGVyc1Jlc3BvbnNlIHtcbiAgaG9sZGVyczogVG9rZW5Ib2xkZXJbXTtcbiAgc3RhdHM6IHtcbiAgICB0b3RhbEFjY291bnRzOiBudW1iZXIgfCBzdHJpbmc7XG4gICAgYWNjb3VudHNBYm92ZU9uZTogbnVtYmVyO1xuICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUb2tlbklkKHRva2VuSWQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFJlbW92ZSBhbnkgc3BhY2VzIGFuZCBjb252ZXJ0IHRvIGxvd2VyY2FzZVxuICB0b2tlbklkID0gdG9rZW5JZC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgXG4gIC8vIElmIGl0J3MgYWxyZWFkeSBpbiBzaGFyZC5yZWFsbS5udW0gZm9ybWF0LCByZXR1cm4gYXMgaXNcbiAgaWYgKHRva2VuSWQuaW5jbHVkZXMoJy4nKSkge1xuICAgIHJldHVybiB0b2tlbklkO1xuICB9XG4gIFxuICAvLyBJZiBpdCdzIGp1c3QgYSBudW1iZXIsIGNvbnZlcnQgdG8gMC4wLm51bWJlciBmb3JtYXRcbiAgaWYgKC9eXFxkKyQvLnRlc3QodG9rZW5JZCkpIHtcbiAgICByZXR1cm4gYDAuMC4ke3Rva2VuSWR9YDtcbiAgfVxuICBcbiAgcmV0dXJuIHRva2VuSWQ7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkluZm8odG9rZW5JZDogc3RyaW5nKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybWF0dGVkVG9rZW5JZCA9IGZvcm1hdFRva2VuSWQodG9rZW5JZCk7XG4gICAgY29uc3QgdXJsID0gYCR7QkFTRV9VUkx9JHtBUElfUEFUSH0vdG9rZW5zLyR7Zm9ybWF0dGVkVG9rZW5JZH1gO1xuICAgIGNvbnNvbGUubG9nKCdGZXRjaGluZyB0b2tlbiBpbmZvIGZyb206JywgdXJsKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldCh1cmwpO1xuICAgIGNvbnNvbGUubG9nKCdUb2tlbiBJbmZvIFJlc3BvbnNlOicsIHJlc3BvbnNlLmRhdGEpO1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9rZW4gaW5mbzonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8IFxuICAgICAgZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQgfHwgXG4gICAgICAnRXJyb3IgZmV0Y2hpbmcgdG9rZW4gZGF0YSdcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbkhvbGRlcnModG9rZW5JZDogc3RyaW5nLCBsaW1pdDogbnVtYmVyID0gNTApOiBQcm9taXNlPFRva2VuSG9sZGVyc1Jlc3BvbnNlPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZm9ybWF0dGVkVG9rZW5JZCA9IGZvcm1hdFRva2VuSWQodG9rZW5JZCk7XG4gICAgY29uc3QgdG9rZW5JbmZvID0gYXdhaXQgZ2V0VG9rZW5JbmZvKGZvcm1hdHRlZFRva2VuSWQpO1xuICAgIGNvbnNvbGUubG9nKCdUb2tlbiBJbmZvOicsIHtcbiAgICAgIG5hbWU6IHRva2VuSW5mby5uYW1lLFxuICAgICAgc3ltYm9sOiB0b2tlbkluZm8uc3ltYm9sLFxuICAgICAgZGVjaW1hbHM6IHRva2VuSW5mby5kZWNpbWFscyxcbiAgICAgIHRvdGFsX3N1cHBseTogdG9rZW5JbmZvLnRvdGFsX3N1cHBseVxuICAgIH0pO1xuICAgIFxuICAgIC8vIFVzZSBhIE1hcCB0byBlbnN1cmUgdW5pcXVlIGFjY291bnRzXG4gICAgY29uc3QgaG9sZGVyc01hcCA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG4gICAgbGV0IGhhc01vcmUgPSB0cnVlO1xuICAgIFxuICAgIC8vIEdldCBmaXJzdCBwYWdlIHdpdGggbWF4aW11bSBsaW1pdFxuICAgIGNvbnN0IGZldGNoUGFnZSA9IGFzeW5jIChuZXh0TGluazogc3RyaW5nIHwgbnVsbCA9IG51bGwpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IG5leHRMaW5rID8gYCR7QkFTRV9VUkx9JHtuZXh0TGlua31gIDogYCR7QkFTRV9VUkx9JHtBUElfUEFUSH0vdG9rZW5zLyR7Zm9ybWF0dGVkVG9rZW5JZH0vYmFsYW5jZXM/bGltaXQ9MTAwYDtcbiAgICAgIGNvbnNvbGUubG9nKCdGZXRjaGluZyBiYWxhbmNlcyBmcm9tOicsIHVybCk7XG4gICAgICByZXR1cm4gYXhpb3MuZ2V0KHVybCk7XG4gICAgfTtcblxuICAgIC8vIEZldGNoIGZpcnN0IHBhZ2VcbiAgICBjb25zdCBmaXJzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hQYWdlKCk7XG4gICAgbGV0IGhvbGRlcnMgPSBmaXJzdFJlc3BvbnNlLmRhdGEuYmFsYW5jZXMuZmlsdGVyKChoOiBhbnkpID0+IGguYmFsYW5jZSAhPT0gJzAnICYmIEJpZ0ludChoLmJhbGFuY2UpID4gMCk7XG4gICAgaG9sZGVycy5mb3JFYWNoKGggPT4gaG9sZGVyc01hcC5zZXQoaC5hY2NvdW50LCBoKSk7XG4gICAgXG4gICAgaGFzTW9yZSA9ICEhZmlyc3RSZXNwb25zZS5kYXRhLmxpbmtzPy5uZXh0O1xuICAgIGxldCBuZXh0TGluayA9IGZpcnN0UmVzcG9uc2UuZGF0YS5saW5rcz8ubmV4dDtcblxuICAgIC8vIEZldGNoIHJlbWFpbmluZyBwYWdlc1xuICAgIGxldCBwYWdlQ291bnQgPSAxO1xuICAgIGNvbnN0IG1heFBhZ2VzID0gMjAwOyAvLyBJbmNyZWFzZWQgdG8gMjAwIHBhZ2VzIHRvIGdldCBtb3JlIGhvbGRlcnNcbiAgICBcbiAgICB3aGlsZSAoaGFzTW9yZSAmJiBwYWdlQ291bnQgPCBtYXhQYWdlcyAmJiBuZXh0TGluaykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coYEZldGNoaW5nIHBhZ2UgJHtwYWdlQ291bnQgKyAxfSB1c2luZyBuZXh0IGxpbmtgKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaFBhZ2UobmV4dExpbmspO1xuICAgICAgICBob2xkZXJzID0gcmVzcG9uc2UuZGF0YS5iYWxhbmNlcy5maWx0ZXIoKGg6IGFueSkgPT4gaC5iYWxhbmNlICE9PSAnMCcgJiYgQmlnSW50KGguYmFsYW5jZSkgPiAwKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChob2xkZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBob2xkZXJzLmZvckVhY2goaCA9PiBob2xkZXJzTWFwLnNldChoLmFjY291bnQsIGgpKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgRm91bmQgJHtob2xkZXJzLmxlbmd0aH0gaG9sZGVycyBvbiBwYWdlICR7cGFnZUNvdW50ICsgMX0gKHRvdGFsIHVuaXF1ZTogJHtob2xkZXJzTWFwLnNpemV9KWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhhc01vcmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbmV4dExpbmsgPSByZXNwb25zZS5kYXRhLmxpbmtzPy5uZXh0O1xuICAgICAgICBoYXNNb3JlID0gaGFzTW9yZSAmJiAhIW5leHRMaW5rO1xuICAgICAgICBwYWdlQ291bnQrKztcbiAgICAgICAgXG4gICAgICAgIC8vIEFkZCBhIHNtYWxsIGRlbGF5IHRvIGF2b2lkIHJhdGUgbGltaXRpbmdcbiAgICAgICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDEwMCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgcGFnZSAke3BhZ2VDb3VudCArIDF9OmAsIGVycm9yKTtcbiAgICAgICAgaGFzTW9yZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbnZlcnQgTWFwIGJhY2sgdG8gYXJyYXlcbiAgICBjb25zdCBhbGxIb2xkZXJzID0gQXJyYXkuZnJvbShob2xkZXJzTWFwLnZhbHVlcygpKTtcbiAgICBjb25zb2xlLmxvZyhgVG90YWwgdW5pcXVlIGhvbGRlcnMgZmV0Y2hlZDogJHthbGxIb2xkZXJzLmxlbmd0aH0gZnJvbSAke3BhZ2VDb3VudH0gcGFnZXNgKTtcblxuICAgIGNvbnN0IGRlY2ltYWxzID0gTnVtYmVyKHRva2VuSW5mby5kZWNpbWFscyk7XG4gICAgY29uc3Qgb25lVG9rZW4gPSBCaWdJbnQoMTAgKiogZGVjaW1hbHMpO1xuICAgIGNvbnN0IHRvdGFsU3VwcGx5QmlnSW50ID0gQmlnSW50KHRva2VuSW5mby50b3RhbF9zdXBwbHkpO1xuXG4gICAgLy8gU29ydCBob2xkZXJzIGJ5IG51bWVyaWMgYmFsYW5jZSB2YWx1ZVxuICAgIGNvbnNvbGUubG9nKCdTb3J0aW5nIGhvbGRlcnMuLi4nKTtcbiAgICBjb25zdCBzb3J0ZWRIb2xkZXJzID0gYWxsSG9sZGVyc1xuICAgICAgLm1hcChob2xkZXIgPT4gKHtcbiAgICAgICAgLi4uaG9sZGVyLFxuICAgICAgICBudW1lcmljQmFsYW5jZTogQmlnSW50KGhvbGRlci5iYWxhbmNlKVxuICAgICAgfSkpXG4gICAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICByZXR1cm4gYS5udW1lcmljQmFsYW5jZSA+IGIubnVtZXJpY0JhbGFuY2UgPyAtMSA6IFxuICAgICAgICAgICAgICAgYS5udW1lcmljQmFsYW5jZSA8IGIubnVtZXJpY0JhbGFuY2UgPyAxIDogMDtcbiAgICAgIH0pXG4gICAgICAuc2xpY2UoMCwgbGltaXQpO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkSG9sZGVycyA9IHNvcnRlZEhvbGRlcnMubWFwKGhvbGRlciA9PiB7XG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gTnVtYmVyKChob2xkZXIubnVtZXJpY0JhbGFuY2UgKiBCaWdJbnQoMTAwMDAwMCkgLyB0b3RhbFN1cHBseUJpZ0ludCkpIC8gMTAwMDA7XG4gICAgICBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFjY291bnQ6IGhvbGRlci5hY2NvdW50LFxuICAgICAgICBiYWxhbmNlOiBob2xkZXIuYmFsYW5jZSxcbiAgICAgICAgcGVyY2VudGFnZVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIExvZyB0b3AgMjAgaG9sZGVycyB3aXRoIGZvcm1hdHRlZCBiYWxhbmNlcyBmb3IgdmVyaWZpY2F0aW9uXG4gICAgY29uc29sZS5sb2coJ1RvcCBob2xkZXJzOicsIGZvcm1hdHRlZEhvbGRlcnMuc2xpY2UoMCwgMjApLm1hcChoID0+ICh7XG4gICAgICBhY2NvdW50OiBoLmFjY291bnQsXG4gICAgICBiYWxhbmNlOiBmb3JtYXRCYWxhbmNlKGguYmFsYW5jZSwgZGVjaW1hbHMpLFxuICAgICAgcGVyY2VudGFnZTogaC5wZXJjZW50YWdlLnRvRml4ZWQoNCkgKyAnJSdcbiAgICB9KSkpO1xuXG4gICAgY29uc3Qgc3RhdHMgPSB7XG4gICAgICB0b3RhbEFjY291bnRzOiBhbGxIb2xkZXJzLmxlbmd0aCArIChoYXNNb3JlID8gJysnIDogJycpLFxuICAgICAgYWNjb3VudHNBYm92ZU9uZTogYWxsSG9sZGVycy5maWx0ZXIoaG9sZGVyID0+IEJpZ0ludChob2xkZXIuYmFsYW5jZSkgPj0gb25lVG9rZW4pLmxlbmd0aFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgaG9sZGVyczogZm9ybWF0dGVkSG9sZGVycyxcbiAgICAgIHN0YXRzXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRva2VuIGhvbGRlcnM6Jywge1xuICAgICAgc3RhdHVzOiBlcnJvci5yZXNwb25zZT8uc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogZXJyb3IucmVzcG9uc2U/LnN0YXR1c1RleHQsXG4gICAgICBkYXRhOiBlcnJvci5yZXNwb25zZT8uZGF0YSxcbiAgICAgIHVybDogZXJyb3IuY29uZmlnPy51cmxcbiAgICB9KTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWNjb3VudEluZm8oYWNjb3VudElkOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtCQVNFX1VSTH0ke0FQSV9QQVRIfS9hY2NvdW50cy8ke2FjY291bnRJZH1gKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGFjY291bnQgaW5mbzonLCB7XG4gICAgICBzdGF0dXM6IGVycm9yLnJlc3BvbnNlPy5zdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0OiBlcnJvci5yZXNwb25zZT8uc3RhdHVzVGV4dCxcbiAgICAgIGRhdGE6IGVycm9yLnJlc3BvbnNlPy5kYXRhLFxuICAgICAgdXJsOiBlcnJvci5jb25maWc/LnVybFxuICAgIH0pO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbi8vIEhlbHBlciBmdW5jdGlvbiB0byBmb3JtYXQgcmF3IGJhbGFuY2Ugd2l0aCBkZWNpbWFsc1xuZnVuY3Rpb24gZm9ybWF0QmFsYW5jZShiYWxhbmNlOiBzdHJpbmcsIGRlY2ltYWxzOiBudW1iZXIpOiBzdHJpbmcge1xuICB0cnkge1xuICAgIGNvbnN0IGJhbGFuY2VCTiA9IEJpZ0ludChiYWxhbmNlKTtcbiAgICBjb25zdCBkaXZpc29yID0gQmlnSW50KDEwICoqIGRlY2ltYWxzKTtcbiAgICBjb25zdCB3aG9sZVBhcnQgPSBiYWxhbmNlQk4gLyBkaXZpc29yO1xuICAgIGNvbnN0IGZyYWN0aW9uYWxQYXJ0ID0gYmFsYW5jZUJOICUgZGl2aXNvcjtcbiAgICBcbiAgICBsZXQgcmVzdWx0ID0gd2hvbGVQYXJ0LnRvU3RyaW5nKCk7XG4gICAgaWYgKGZyYWN0aW9uYWxQYXJ0ID4gMCkge1xuICAgICAgbGV0IGZyYWN0aW9uYWxTdHIgPSBmcmFjdGlvbmFsUGFydC50b1N0cmluZygpLnBhZFN0YXJ0KGRlY2ltYWxzLCAnMCcpO1xuICAgICAgLy8gS2VlcCBhbGwgc2lnbmlmaWNhbnQgZGVjaW1hbCBwbGFjZXNcbiAgICAgIHdoaWxlIChmcmFjdGlvbmFsU3RyLmVuZHNXaXRoKCcwJykpIHtcbiAgICAgICAgZnJhY3Rpb25hbFN0ciA9IGZyYWN0aW9uYWxTdHIuc2xpY2UoMCwgLTEpO1xuICAgICAgfVxuICAgICAgaWYgKGZyYWN0aW9uYWxTdHIubGVuZ3RoID4gMCkge1xuICAgICAgICByZXN1bHQgKz0gJy4nICsgZnJhY3Rpb25hbFN0cjtcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gQWRkIHRob3VzYW5kIHNlcGFyYXRvcnNcbiAgICBjb25zdCBwYXJ0cyA9IHJlc3VsdC5zcGxpdCgnLicpO1xuICAgIHBhcnRzWzBdID0gcGFydHNbMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgJywnKTtcbiAgICByZXR1cm4gcGFydHMuam9pbignLicpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZvcm1hdHRpbmcgYmFsYW5jZTonLCBlcnJvcik7XG4gICAgcmV0dXJuIGJhbGFuY2U7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsIkJBU0VfVVJMIiwiQVBJX1BBVEgiLCJmb3JtYXRUb2tlbklkIiwidG9rZW5JZCIsInRyaW0iLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidGVzdCIsImdldFRva2VuSW5mbyIsImZvcm1hdHRlZFRva2VuSWQiLCJ1cmwiLCJjb25zb2xlIiwibG9nIiwicmVzcG9uc2UiLCJnZXQiLCJkYXRhIiwiZXJyb3IiLCJzdGF0dXMiLCJzdGF0dXNUZXh0IiwiY29uZmlnIiwiRXJyb3IiLCJtZXNzYWdlIiwiZ2V0VG9rZW5Ib2xkZXJzIiwibGltaXQiLCJmaXJzdFJlc3BvbnNlIiwidG9rZW5JbmZvIiwibmFtZSIsInN5bWJvbCIsImRlY2ltYWxzIiwidG90YWxfc3VwcGx5IiwiaG9sZGVyc01hcCIsIk1hcCIsImhhc01vcmUiLCJmZXRjaFBhZ2UiLCJuZXh0TGluayIsImhvbGRlcnMiLCJiYWxhbmNlcyIsImZpbHRlciIsImgiLCJiYWxhbmNlIiwiQmlnSW50IiwiZm9yRWFjaCIsInNldCIsImFjY291bnQiLCJsaW5rcyIsIm5leHQiLCJwYWdlQ291bnQiLCJtYXhQYWdlcyIsImxlbmd0aCIsInNpemUiLCJQcm9taXNlIiwicmVzb2x2ZSIsInNldFRpbWVvdXQiLCJhbGxIb2xkZXJzIiwiQXJyYXkiLCJmcm9tIiwidmFsdWVzIiwiTnVtYmVyIiwib25lVG9rZW4iLCJ0b3RhbFN1cHBseUJpZ0ludCIsInNvcnRlZEhvbGRlcnMiLCJtYXAiLCJob2xkZXIiLCJudW1lcmljQmFsYW5jZSIsInNvcnQiLCJhIiwiYiIsInNsaWNlIiwiZm9ybWF0dGVkSG9sZGVycyIsInBlcmNlbnRhZ2UiLCJmb3JtYXRCYWxhbmNlIiwidG9GaXhlZCIsInN0YXRzIiwidG90YWxBY2NvdW50cyIsImFjY291bnRzQWJvdmVPbmUiLCJnZXRBY2NvdW50SW5mbyIsImFjY291bnRJZCIsImJhbGFuY2VCTiIsImRpdmlzb3IiLCJ3aG9sZVBhcnQiLCJmcmFjdGlvbmFsUGFydCIsInJlc3VsdCIsInRvU3RyaW5nIiwiZnJhY3Rpb25hbFN0ciIsInBhZFN0YXJ0IiwiZW5kc1dpdGgiLCJwYXJ0cyIsInNwbGl0IiwicmVwbGFjZSIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});