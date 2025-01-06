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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAccountInfo: function() { return /* binding */ getAccountInfo; },\n/* harmony export */   getTokenHolders: function() { return /* binding */ getTokenHolders; },\n/* harmony export */   getTokenInfo: function() { return /* binding */ getTokenInfo; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n\nconst MIRROR_NODE_URL = \"https://mainnet-public.mirrornode.hedera.com\";\nasync function getTokenInfo(tokenId) {\n    console.log(\"Fetching token info from: \".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId));\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId));\n    console.log(\"Token Info Response:\", {\n        name: response.data.name,\n        symbol: response.data.symbol,\n        decimals: response.data.decimals,\n        total_supply: response.data.total_supply,\n        max_supply: response.data.max_supply,\n        treasury_account_id: response.data.treasury_account_id,\n        admin_key: response.data.admin_key\n    });\n    return response.data;\n}\nasync function getTokenHolders(tokenId) {\n    let limit = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 50;\n    var _firstResponse_data_links;\n    const tokenInfo = await getTokenInfo(tokenId);\n    let allHolders = [];\n    let nextLink = null;\n    // Fetch first page\n    const firstResponse = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/tokens/\").concat(tokenId, \"/balances\"), {\n        params: {\n            limit: 100,\n            order: \"desc\"\n        }\n    });\n    allHolders = [\n        ...firstResponse.data.balances\n    ];\n    nextLink = (_firstResponse_data_links = firstResponse.data.links) === null || _firstResponse_data_links === void 0 ? void 0 : _firstResponse_data_links.next;\n    // Fetch all pages to get complete holder count\n    while(nextLink){\n        var _nextResponse_data_links;\n        const nextResponse = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL).concat(nextLink));\n        allHolders = [\n            ...allHolders,\n            ...nextResponse.data.balances\n        ];\n        nextLink = (_nextResponse_data_links = nextResponse.data.links) === null || _nextResponse_data_links === void 0 ? void 0 : _nextResponse_data_links.next;\n    }\n    const decimals = Number(tokenInfo.decimals);\n    const oneToken = BigInt(10 ** decimals);\n    // Calculate statistics\n    const stats = {\n        totalAccounts: allHolders.length,\n        accountsAboveOne: allHolders.filter((holder)=>BigInt(holder.balance) >= oneToken).length\n    };\n    // Sort all holders by balance\n    const sortedHolders = allHolders.sort((a, b)=>{\n        const balanceA = BigInt(a.balance);\n        const balanceB = BigInt(b.balance);\n        return balanceB > balanceA ? 1 : balanceB < balanceA ? -1 : 0;\n    }).slice(0, limit);\n    const totalSupplyBigInt = BigInt(tokenInfo.total_supply);\n    const holders = sortedHolders.map((holder)=>{\n        const holderBalance = BigInt(holder.balance);\n        const percentage = Number(holderBalance * BigInt(1000000) / totalSupplyBigInt) / 10000;\n        return {\n            account: holder.account,\n            balance: holder.balance,\n            percentage\n        };\n    });\n    return {\n        holders,\n        stats\n    };\n}\nasync function getAccountInfo(accountId) {\n    const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(\"\".concat(MIRROR_NODE_URL, \"/api/v1/accounts/\").concat(accountId));\n    return response.data;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy91dGlscy9oZWRlcmEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxrQkFBa0I7QUFnQmpCLGVBQWVDLGFBQWFDLE9BQWU7SUFDaERDLFFBQVFDLEdBQUcsQ0FBQyw2QkFBOERGLE9BQWpDRixpQkFBZ0IsbUJBQXlCLE9BQVJFO0lBQzFFLE1BQU1HLFdBQVcsTUFBTU4sNkNBQUtBLENBQUNPLEdBQUcsQ0FBQyxHQUFvQ0osT0FBakNGLGlCQUFnQixtQkFBeUIsT0FBUkU7SUFDckVDLFFBQVFDLEdBQUcsQ0FBQyx3QkFBd0I7UUFDbENHLE1BQU1GLFNBQVNHLElBQUksQ0FBQ0QsSUFBSTtRQUN4QkUsUUFBUUosU0FBU0csSUFBSSxDQUFDQyxNQUFNO1FBQzVCQyxVQUFVTCxTQUFTRyxJQUFJLENBQUNFLFFBQVE7UUFDaENDLGNBQWNOLFNBQVNHLElBQUksQ0FBQ0csWUFBWTtRQUN4Q0MsWUFBWVAsU0FBU0csSUFBSSxDQUFDSSxVQUFVO1FBQ3BDQyxxQkFBcUJSLFNBQVNHLElBQUksQ0FBQ0ssbUJBQW1CO1FBQ3REQyxXQUFXVCxTQUFTRyxJQUFJLENBQUNNLFNBQVM7SUFDcEM7SUFDQSxPQUFPVCxTQUFTRyxJQUFJO0FBQ3RCO0FBRU8sZUFBZU8sZ0JBQWdCYixPQUFlO1FBQUVjLFFBQUFBLGlFQUFnQjtRQWMxREM7SUFiWCxNQUFNQyxZQUFZLE1BQU1qQixhQUFhQztJQUNyQyxJQUFJaUIsYUFBb0IsRUFBRTtJQUMxQixJQUFJQyxXQUFXO0lBRWYsbUJBQW1CO0lBQ25CLE1BQU1ILGdCQUFnQixNQUFNbEIsNkNBQUtBLENBQUNPLEdBQUcsQ0FBQyxHQUFvQ0osT0FBakNGLGlCQUFnQixtQkFBeUIsT0FBUkUsU0FBUSxjQUFZO1FBQzVGbUIsUUFBUTtZQUNOTCxPQUFPO1lBQ1BNLE9BQU87UUFDVDtJQUNGO0lBRUFILGFBQWE7V0FBSUYsY0FBY1QsSUFBSSxDQUFDZSxRQUFRO0tBQUM7SUFDN0NILFlBQVdILDRCQUFBQSxjQUFjVCxJQUFJLENBQUNnQixLQUFLLGNBQXhCUCxnREFBQUEsMEJBQTBCUSxJQUFJO0lBRXpDLCtDQUErQztJQUMvQyxNQUFPTCxTQUFVO1lBR0pNO1FBRlgsTUFBTUEsZUFBZSxNQUFNM0IsNkNBQUtBLENBQUNPLEdBQUcsQ0FBQyxHQUFxQmMsT0FBbEJwQixpQkFBMkIsT0FBVG9CO1FBQzFERCxhQUFhO2VBQUlBO2VBQWVPLGFBQWFsQixJQUFJLENBQUNlLFFBQVE7U0FBQztRQUMzREgsWUFBV00sMkJBQUFBLGFBQWFsQixJQUFJLENBQUNnQixLQUFLLGNBQXZCRSwrQ0FBQUEseUJBQXlCRCxJQUFJO0lBQzFDO0lBRUEsTUFBTWYsV0FBV2lCLE9BQU9ULFVBQVVSLFFBQVE7SUFDMUMsTUFBTWtCLFdBQVdDLE9BQU8sTUFBTW5CO0lBRTlCLHVCQUF1QjtJQUN2QixNQUFNb0IsUUFBUTtRQUNaQyxlQUFlWixXQUFXYSxNQUFNO1FBQ2hDQyxrQkFBa0JkLFdBQVdlLE1BQU0sQ0FBQ0MsQ0FBQUEsU0FBVU4sT0FBT00sT0FBT0MsT0FBTyxLQUFLUixVQUFVSSxNQUFNO0lBQzFGO0lBRUEsOEJBQThCO0lBQzlCLE1BQU1LLGdCQUFnQmxCLFdBQ25CbUIsSUFBSSxDQUFDLENBQUNDLEdBQUdDO1FBQ1IsTUFBTUMsV0FBV1osT0FBT1UsRUFBRUgsT0FBTztRQUNqQyxNQUFNTSxXQUFXYixPQUFPVyxFQUFFSixPQUFPO1FBQ2pDLE9BQU9NLFdBQVdELFdBQVcsSUFBSUMsV0FBV0QsV0FBVyxDQUFDLElBQUk7SUFDOUQsR0FDQ0UsS0FBSyxDQUFDLEdBQUczQjtJQUVaLE1BQU00QixvQkFBb0JmLE9BQU9YLFVBQVVQLFlBQVk7SUFFdkQsTUFBTWtDLFVBQVVSLGNBQWNTLEdBQUcsQ0FBQ1gsQ0FBQUE7UUFDaEMsTUFBTVksZ0JBQWdCbEIsT0FBT00sT0FBT0MsT0FBTztRQUMzQyxNQUFNWSxhQUFhckIsT0FBUW9CLGdCQUFnQmxCLE9BQU8sV0FBV2UscUJBQXNCO1FBRW5GLE9BQU87WUFDTEssU0FBU2QsT0FBT2MsT0FBTztZQUN2QmIsU0FBU0QsT0FBT0MsT0FBTztZQUN2Qlk7UUFDRjtJQUNGO0lBRUEsT0FBTztRQUNMSDtRQUNBZjtJQUNGO0FBQ0Y7QUFFTyxlQUFlb0IsZUFBZUMsU0FBaUI7SUFDcEQsTUFBTTlDLFdBQVcsTUFBTU4sNkNBQUtBLENBQUNPLEdBQUcsQ0FBQyxHQUFzQzZDLE9BQW5DbkQsaUJBQWdCLHFCQUE2QixPQUFWbUQ7SUFDdkUsT0FBTzlDLFNBQVNHLElBQUk7QUFDdEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL3V0aWxzL2hlZGVyYS50cz82YTk5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IE1JUlJPUl9OT0RFX1VSTCA9ICdodHRwczovL21haW5uZXQtcHVibGljLm1pcnJvcm5vZGUuaGVkZXJhLmNvbSc7XG5cbmludGVyZmFjZSBUb2tlbkhvbGRlciB7XG4gIGFjY291bnQ6IHN0cmluZztcbiAgYmFsYW5jZTogc3RyaW5nO1xuICBwZXJjZW50YWdlOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBUb2tlbkhvbGRlcnNSZXNwb25zZSB7XG4gIGhvbGRlcnM6IFRva2VuSG9sZGVyW107XG4gIHN0YXRzOiB7XG4gICAgdG90YWxBY2NvdW50czogbnVtYmVyO1xuICAgIGFjY291bnRzQWJvdmVPbmU6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VuSW5mbyh0b2tlbklkOiBzdHJpbmcpIHtcbiAgY29uc29sZS5sb2coYEZldGNoaW5nIHRva2VuIGluZm8gZnJvbTogJHtNSVJST1JfTk9ERV9VUkx9L2FwaS92MS90b2tlbnMvJHt0b2tlbklkfWApO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtNSVJST1JfTk9ERV9VUkx9L2FwaS92MS90b2tlbnMvJHt0b2tlbklkfWApO1xuICBjb25zb2xlLmxvZygnVG9rZW4gSW5mbyBSZXNwb25zZTonLCB7XG4gICAgbmFtZTogcmVzcG9uc2UuZGF0YS5uYW1lLFxuICAgIHN5bWJvbDogcmVzcG9uc2UuZGF0YS5zeW1ib2wsXG4gICAgZGVjaW1hbHM6IHJlc3BvbnNlLmRhdGEuZGVjaW1hbHMsXG4gICAgdG90YWxfc3VwcGx5OiByZXNwb25zZS5kYXRhLnRvdGFsX3N1cHBseSxcbiAgICBtYXhfc3VwcGx5OiByZXNwb25zZS5kYXRhLm1heF9zdXBwbHksXG4gICAgdHJlYXN1cnlfYWNjb3VudF9pZDogcmVzcG9uc2UuZGF0YS50cmVhc3VyeV9hY2NvdW50X2lkLFxuICAgIGFkbWluX2tleTogcmVzcG9uc2UuZGF0YS5hZG1pbl9rZXksXG4gIH0pO1xuICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VuSG9sZGVycyh0b2tlbklkOiBzdHJpbmcsIGxpbWl0OiBudW1iZXIgPSA1MCk6IFByb21pc2U8VG9rZW5Ib2xkZXJzUmVzcG9uc2U+IHtcbiAgY29uc3QgdG9rZW5JbmZvID0gYXdhaXQgZ2V0VG9rZW5JbmZvKHRva2VuSWQpO1xuICBsZXQgYWxsSG9sZGVyczogYW55W10gPSBbXTtcbiAgbGV0IG5leHRMaW5rID0gbnVsbDtcbiAgXG4gIC8vIEZldGNoIGZpcnN0IHBhZ2VcbiAgY29uc3QgZmlyc3RSZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtNSVJST1JfTk9ERV9VUkx9L2FwaS92MS90b2tlbnMvJHt0b2tlbklkfS9iYWxhbmNlc2AsIHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIGxpbWl0OiAxMDAsXG4gICAgICBvcmRlcjogJ2Rlc2MnXG4gICAgfVxuICB9KTtcbiAgXG4gIGFsbEhvbGRlcnMgPSBbLi4uZmlyc3RSZXNwb25zZS5kYXRhLmJhbGFuY2VzXTtcbiAgbmV4dExpbmsgPSBmaXJzdFJlc3BvbnNlLmRhdGEubGlua3M/Lm5leHQ7XG5cbiAgLy8gRmV0Y2ggYWxsIHBhZ2VzIHRvIGdldCBjb21wbGV0ZSBob2xkZXIgY291bnRcbiAgd2hpbGUgKG5leHRMaW5rKSB7XG4gICAgY29uc3QgbmV4dFJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KGAke01JUlJPUl9OT0RFX1VSTH0ke25leHRMaW5rfWApO1xuICAgIGFsbEhvbGRlcnMgPSBbLi4uYWxsSG9sZGVycywgLi4ubmV4dFJlc3BvbnNlLmRhdGEuYmFsYW5jZXNdO1xuICAgIG5leHRMaW5rID0gbmV4dFJlc3BvbnNlLmRhdGEubGlua3M/Lm5leHQ7XG4gIH1cblxuICBjb25zdCBkZWNpbWFscyA9IE51bWJlcih0b2tlbkluZm8uZGVjaW1hbHMpO1xuICBjb25zdCBvbmVUb2tlbiA9IEJpZ0ludCgxMCAqKiBkZWNpbWFscyk7XG5cbiAgLy8gQ2FsY3VsYXRlIHN0YXRpc3RpY3NcbiAgY29uc3Qgc3RhdHMgPSB7XG4gICAgdG90YWxBY2NvdW50czogYWxsSG9sZGVycy5sZW5ndGgsXG4gICAgYWNjb3VudHNBYm92ZU9uZTogYWxsSG9sZGVycy5maWx0ZXIoaG9sZGVyID0+IEJpZ0ludChob2xkZXIuYmFsYW5jZSkgPj0gb25lVG9rZW4pLmxlbmd0aFxuICB9O1xuXG4gIC8vIFNvcnQgYWxsIGhvbGRlcnMgYnkgYmFsYW5jZVxuICBjb25zdCBzb3J0ZWRIb2xkZXJzID0gYWxsSG9sZGVyc1xuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCBiYWxhbmNlQSA9IEJpZ0ludChhLmJhbGFuY2UpO1xuICAgICAgY29uc3QgYmFsYW5jZUIgPSBCaWdJbnQoYi5iYWxhbmNlKTtcbiAgICAgIHJldHVybiBiYWxhbmNlQiA+IGJhbGFuY2VBID8gMSA6IGJhbGFuY2VCIDwgYmFsYW5jZUEgPyAtMSA6IDA7XG4gICAgfSlcbiAgICAuc2xpY2UoMCwgbGltaXQpO1xuXG4gIGNvbnN0IHRvdGFsU3VwcGx5QmlnSW50ID0gQmlnSW50KHRva2VuSW5mby50b3RhbF9zdXBwbHkpO1xuXG4gIGNvbnN0IGhvbGRlcnMgPSBzb3J0ZWRIb2xkZXJzLm1hcChob2xkZXIgPT4ge1xuICAgIGNvbnN0IGhvbGRlckJhbGFuY2UgPSBCaWdJbnQoaG9sZGVyLmJhbGFuY2UpO1xuICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBOdW1iZXIoKGhvbGRlckJhbGFuY2UgKiBCaWdJbnQoMTAwMDAwMCkgLyB0b3RhbFN1cHBseUJpZ0ludCkpIC8gMTAwMDA7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY291bnQ6IGhvbGRlci5hY2NvdW50LFxuICAgICAgYmFsYW5jZTogaG9sZGVyLmJhbGFuY2UsXG4gICAgICBwZXJjZW50YWdlXG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBob2xkZXJzLFxuICAgIHN0YXRzXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRBY2NvdW50SW5mbyhhY2NvdW50SWQ6IHN0cmluZykge1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChgJHtNSVJST1JfTk9ERV9VUkx9L2FwaS92MS9hY2NvdW50cy8ke2FjY291bnRJZH1gKTtcbiAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJNSVJST1JfTk9ERV9VUkwiLCJnZXRUb2tlbkluZm8iLCJ0b2tlbklkIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZ2V0IiwibmFtZSIsImRhdGEiLCJzeW1ib2wiLCJkZWNpbWFscyIsInRvdGFsX3N1cHBseSIsIm1heF9zdXBwbHkiLCJ0cmVhc3VyeV9hY2NvdW50X2lkIiwiYWRtaW5fa2V5IiwiZ2V0VG9rZW5Ib2xkZXJzIiwibGltaXQiLCJmaXJzdFJlc3BvbnNlIiwidG9rZW5JbmZvIiwiYWxsSG9sZGVycyIsIm5leHRMaW5rIiwicGFyYW1zIiwib3JkZXIiLCJiYWxhbmNlcyIsImxpbmtzIiwibmV4dCIsIm5leHRSZXNwb25zZSIsIk51bWJlciIsIm9uZVRva2VuIiwiQmlnSW50Iiwic3RhdHMiLCJ0b3RhbEFjY291bnRzIiwibGVuZ3RoIiwiYWNjb3VudHNBYm92ZU9uZSIsImZpbHRlciIsImhvbGRlciIsImJhbGFuY2UiLCJzb3J0ZWRIb2xkZXJzIiwic29ydCIsImEiLCJiIiwiYmFsYW5jZUEiLCJiYWxhbmNlQiIsInNsaWNlIiwidG90YWxTdXBwbHlCaWdJbnQiLCJob2xkZXJzIiwibWFwIiwiaG9sZGVyQmFsYW5jZSIsInBlcmNlbnRhZ2UiLCJhY2NvdW50IiwiZ2V0QWNjb3VudEluZm8iLCJhY2NvdW50SWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/utils/hedera.ts\n"));

/***/ })

});