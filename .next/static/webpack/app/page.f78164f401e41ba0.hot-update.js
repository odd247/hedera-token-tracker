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

/***/ "(app-pages-browser)/./src/app/page.tsx":
/*!**************************!*\
  !*** ./src/app/page.tsx ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_hedera__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/hedera */ \"(app-pages-browser)/./src/utils/hedera.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Home() {\n    _s();\n    const [tokenId, setTokenId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        holders: [],\n        info: null,\n        error: null,\n        loading: false\n    });\n    const formatBalance = (balance, decimals)=>{\n        const value = BigInt(balance);\n        const divisor = BigInt(10 ** decimals);\n        const integerPart = value / divisor;\n        const fractionalPart = value % divisor;\n        let formattedFractional = fractionalPart.toString().padStart(decimals, \"0\");\n        // Remove trailing zeros\n        formattedFractional = formattedFractional.replace(/0+$/, \"\");\n        const formattedInteger = integerPart.toLocaleString();\n        return formattedFractional ? \"\".concat(formattedInteger, \".\").concat(formattedFractional) : formattedInteger;\n    };\n    const handleSearch = async ()=>{\n        if (!tokenId) {\n            setData((prev)=>({\n                    ...prev,\n                    error: \"Please enter a token ID\"\n                }));\n            return;\n        }\n        setData((prev)=>({\n                ...prev,\n                loading: true,\n                error: null\n            }));\n        try {\n            const info = await (0,_utils_hedera__WEBPACK_IMPORTED_MODULE_2__.getTokenInfo)(tokenId);\n            console.log(\"Received token info:\", info);\n            setData((prev)=>({\n                    ...prev,\n                    info: {\n                        name: info.name,\n                        symbol: info.symbol,\n                        total_supply: info.total_supply,\n                        decimals: info.decimals\n                    }\n                }));\n            const response = await (0,_utils_hedera__WEBPACK_IMPORTED_MODULE_2__.getTokenHolders)(tokenId);\n            setData((prev)=>({\n                    ...prev,\n                    holders: response.holders,\n                    loading: false\n                }));\n        } catch (error) {\n            console.error(\"Error fetching token data:\", error);\n            setData((prev)=>({\n                    ...prev,\n                    error: \"Error fetching token data. Please check the token ID and try again.\",\n                    loading: false\n                }));\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen p-8\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"max-w-4xl mx-auto\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                    className: \"text-3xl font-bold mb-8\",\n                    children: \"Hedera Token Tracker\"\n                }, void 0, false, {\n                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                    lineNumber: 77,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex gap-4 mb-8\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                            type: \"text\",\n                            value: tokenId,\n                            onChange: (e)=>setTokenId(e.target.value),\n                            placeholder: \"Enter token ID (e.g., 0.0.1234)\",\n                            className: \"flex-1 p-2 border rounded\"\n                        }, void 0, false, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 80,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: handleSearch,\n                            disabled: data.loading,\n                            className: \"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300\",\n                            children: data.loading ? \"Loading...\" : \"Search\"\n                        }, void 0, false, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 87,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                    lineNumber: 79,\n                    columnNumber: 9\n                }, this),\n                data.error && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"text-red-500 mb-4\",\n                    children: data.error\n                }, void 0, false, {\n                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                    lineNumber: 97,\n                    columnNumber: 11\n                }, this),\n                data.info && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mb-8 p-4 bg-gray-100 rounded\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"text-xl font-bold mb-2\",\n                            children: \"Token Information\"\n                        }, void 0, false, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 102,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                    children: \"Name:\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                    lineNumber: 103,\n                                    columnNumber: 18\n                                }, this),\n                                \" \",\n                                data.info.name\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 103,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                    children: \"Symbol:\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                    lineNumber: 104,\n                                    columnNumber: 18\n                                }, this),\n                                \" \",\n                                data.info.symbol\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 104,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                    children: \"Total Supply:\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                    lineNumber: 105,\n                                    columnNumber: 18\n                                }, this),\n                                \" \",\n                                formatBalance(data.info.total_supply, data.info.decimals)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 105,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                    lineNumber: 101,\n                    columnNumber: 11\n                }, this),\n                data.holders.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                            className: \"text-xl font-bold mb-4\",\n                            children: \"Top Token Holders\"\n                        }, void 0, false, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 111,\n                            columnNumber: 13\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"overflow-x-auto\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                                className: \"min-w-full bg-white\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                            className: \"bg-gray-100\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                    className: \"p-2 text-left\",\n                                                    children: \"Account\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                    lineNumber: 116,\n                                                    columnNumber: 21\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                    className: \"p-2 text-right\",\n                                                    children: \"Balance\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                    lineNumber: 117,\n                                                    columnNumber: 21\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                    className: \"p-2 text-right\",\n                                                    children: \"Percentage\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                    lineNumber: 118,\n                                                    columnNumber: 21\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                            lineNumber: 115,\n                                            columnNumber: 19\n                                        }, this)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                        lineNumber: 114,\n                                        columnNumber: 17\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                                        children: data.holders.map((holder, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                                className: index % 2 === 0 ? \"bg-gray-50\" : \"\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                        className: \"p-2\",\n                                                        children: holder.account\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                        lineNumber: 124,\n                                                        columnNumber: 23\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                        className: \"p-2 text-right font-mono\",\n                                                        children: data.info ? formatBalance(holder.balance, data.info.decimals) : holder.balance\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                        lineNumber: 125,\n                                                        columnNumber: 23\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                        className: \"p-2 text-right\",\n                                                        children: [\n                                                            holder.percentage.toFixed(4),\n                                                            \"%\"\n                                                        ]\n                                                    }, void 0, true, {\n                                                        fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                        lineNumber: 128,\n                                                        columnNumber: 23\n                                                    }, this)\n                                                ]\n                                            }, holder.account, true, {\n                                                fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                                lineNumber: 123,\n                                                columnNumber: 21\n                                            }, this))\n                                    }, void 0, false, {\n                                        fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                        lineNumber: 121,\n                                        columnNumber: 17\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                                lineNumber: 113,\n                                columnNumber: 15\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                            lineNumber: 112,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n                    lineNumber: 110,\n                    columnNumber: 11\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n            lineNumber: 76,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/owenmcmahon/CascadeProjects/hedera-token-tracker/src/app/page.tsx\",\n        lineNumber: 75,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"oFgJNeixjlmHR1CITR8q8WZ98mk=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVpQztBQUN1RDtBQVN6RSxTQUFTRzs7SUFDdEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdMLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ00sTUFBTUMsUUFBUSxHQUFHUCwrQ0FBUUEsQ0FBWTtRQUMxQ1EsU0FBUyxFQUFFO1FBQ1hDLE1BQU07UUFDTkMsT0FBTztRQUNQQyxTQUFTO0lBQ1g7SUFFQSxNQUFNQyxnQkFBZ0IsQ0FBQ0MsU0FBaUJDO1FBQ3RDLE1BQU1DLFFBQVFDLE9BQU9IO1FBQ3JCLE1BQU1JLFVBQVVELE9BQU8sTUFBTUY7UUFDN0IsTUFBTUksY0FBY0gsUUFBUUU7UUFDNUIsTUFBTUUsaUJBQWlCSixRQUFRRTtRQUUvQixJQUFJRyxzQkFBc0JELGVBQWVFLFFBQVEsR0FBR0MsUUFBUSxDQUFDUixVQUFVO1FBQ3ZFLHdCQUF3QjtRQUN4Qk0sc0JBQXNCQSxvQkFBb0JHLE9BQU8sQ0FBQyxPQUFPO1FBRXpELE1BQU1DLG1CQUFtQk4sWUFBWU8sY0FBYztRQUVuRCxPQUFPTCxzQkFBc0IsR0FBdUJBLE9BQXBCSSxrQkFBaUIsS0FBdUIsT0FBcEJKLHVCQUF3Qkk7SUFDOUU7SUFFQSxNQUFNRSxlQUFlO1FBQ25CLElBQUksQ0FBQ3RCLFNBQVM7WUFDWkcsUUFBUW9CLENBQUFBLE9BQVM7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRWpCLE9BQU87Z0JBQTBCO1lBQzdEO1FBQ0Y7UUFFQUgsUUFBUW9CLENBQUFBLE9BQVM7Z0JBQUUsR0FBR0EsSUFBSTtnQkFBRWhCLFNBQVM7Z0JBQU1ELE9BQU87WUFBSztRQUV2RCxJQUFJO1lBQ0YsTUFBTUQsT0FBTyxNQUFNUCwyREFBWUEsQ0FBQ0U7WUFDaEN3QixRQUFRQyxHQUFHLENBQUMsd0JBQXdCcEI7WUFDcENGLFFBQVFvQixDQUFBQSxPQUFTO29CQUNmLEdBQUdBLElBQUk7b0JBQ1Bs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dkIsV0FBVTs7NERBQWtCcUIsT0FBT0ksVUFBVSxDQUFDQyxPQUFPLENBQUM7NERBQUc7Ozs7Ozs7OytDQUx0REwsT0FBT0csT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQjNDO0dBOUh3QnhEO0tBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvcGFnZS50c3g/ZjY4YSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0VG9rZW5Ib2xkZXJzLCBnZXRUb2tlbkluZm8sIFRva2VuSG9sZGVyLCBUb2tlbkluZm8gfSBmcm9tICcuLi91dGlscy9oZWRlcmEnO1xuXG5pbnRlcmZhY2UgVG9rZW5EYXRhIHtcbiAgaG9sZGVyczogVG9rZW5Ib2xkZXJbXTtcbiAgaW5mbzogVG9rZW5JbmZvIHwgbnVsbDtcbiAgZXJyb3I6IHN0cmluZyB8IG51bGw7XG4gIGxvYWRpbmc6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFt0b2tlbklkLCBzZXRUb2tlbklkXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGU8VG9rZW5EYXRhPih7XG4gICAgaG9sZGVyczogW10sXG4gICAgaW5mbzogbnVsbCxcbiAgICBlcnJvcjogbnVsbCxcbiAgICBsb2FkaW5nOiBmYWxzZVxuICB9KTtcblxuICBjb25zdCBmb3JtYXRCYWxhbmNlID0gKGJhbGFuY2U6IHN0cmluZywgZGVjaW1hbHM6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gQmlnSW50KGJhbGFuY2UpO1xuICAgIGNvbnN0IGRpdmlzb3IgPSBCaWdJbnQoMTAgKiogZGVjaW1hbHMpO1xuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsdWUgLyBkaXZpc29yO1xuICAgIGNvbnN0IGZyYWN0aW9uYWxQYXJ0ID0gdmFsdWUgJSBkaXZpc29yO1xuICAgIFxuICAgIGxldCBmb3JtYXR0ZWRGcmFjdGlvbmFsID0gZnJhY3Rpb25hbFBhcnQudG9TdHJpbmcoKS5wYWRTdGFydChkZWNpbWFscywgJzAnKTtcbiAgICAvLyBSZW1vdmUgdHJhaWxpbmcgemVyb3NcbiAgICBmb3JtYXR0ZWRGcmFjdGlvbmFsID0gZm9ybWF0dGVkRnJhY3Rpb25hbC5yZXBsYWNlKC8wKyQvLCAnJyk7XG4gICAgXG4gICAgY29uc3QgZm9ybWF0dGVkSW50ZWdlciA9IGludGVnZXJQYXJ0LnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgXG4gICAgcmV0dXJuIGZvcm1hdHRlZEZyYWN0aW9uYWwgPyBgJHtmb3JtYXR0ZWRJbnRlZ2VyfS4ke2Zvcm1hdHRlZEZyYWN0aW9uYWx9YCA6IGZvcm1hdHRlZEludGVnZXI7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghdG9rZW5JZCkge1xuICAgICAgc2V0RGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIGVycm9yOiAnUGxlYXNlIGVudGVyIGEgdG9rZW4gSUQnIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXREYXRhKHByZXYgPT4gKHsgLi4ucHJldiwgbG9hZGluZzogdHJ1ZSwgZXJyb3I6IG51bGwgfSkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGluZm8gPSBhd2FpdCBnZXRUb2tlbkluZm8odG9rZW5JZCk7XG4gICAgICBjb25zb2xlLmxvZygnUmVjZWl2ZWQgdG9rZW4gaW5mbzonLCBpbmZvKTtcbiAgICAgIHNldERhdGEocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBpbmZvOiB7XG4gICAgICAgICAgbmFtZTogaW5mby5uYW1lLFxuICAgICAgICAgIHN5bWJvbDogaW5mby5zeW1ib2wsXG4gICAgICAgICAgdG90YWxfc3VwcGx5OiBpbmZvLnRvdGFsX3N1cHBseSxcbiAgICAgICAgICBkZWNpbWFsczogaW5mby5kZWNpbWFsc1xuICAgICAgICB9XG4gICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0VG9rZW5Ib2xkZXJzKHRva2VuSWQpO1xuICAgICAgc2V0RGF0YShwcmV2ID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIGhvbGRlcnM6IHJlc3BvbnNlLmhvbGRlcnMsXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRva2VuIGRhdGE6JywgZXJyb3IpO1xuICAgICAgc2V0RGF0YShwcmV2ID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIGVycm9yOiAnRXJyb3IgZmV0Y2hpbmcgdG9rZW4gZGF0YS4gUGxlYXNlIGNoZWNrIHRoZSB0b2tlbiBJRCBhbmQgdHJ5IGFnYWluLicsXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW4gY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIHAtOFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0b1wiPlxuICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0zeGwgZm9udC1ib2xkIG1iLThcIj5IZWRlcmEgVG9rZW4gVHJhY2tlcjwvaDE+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTQgbWItOFwiPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgdmFsdWU9e3Rva2VuSWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFRva2VuSWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB0b2tlbiBJRCAoZS5nLiwgMC4wLjEyMzQpXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBwLTIgYm9yZGVyIHJvdW5kZWRcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2VhcmNofVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2RhdGEubG9hZGluZ31cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiBiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQgaG92ZXI6YmctYmx1ZS02MDAgZGlzYWJsZWQ6YmctYmx1ZS0zMDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtkYXRhLmxvYWRpbmcgPyAnTG9hZGluZy4uLicgOiAnU2VhcmNoJ31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2RhdGEuZXJyb3IgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yZWQtNTAwIG1iLTRcIj57ZGF0YS5lcnJvcn08L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7ZGF0YS5pbmZvICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTggcC00IGJnLWdyYXktMTAwIHJvdW5kZWRcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCBtYi0yXCI+VG9rZW4gSW5mb3JtYXRpb248L2gyPlxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPk5hbWU6PC9zdHJvbmc+IHtkYXRhLmluZm8ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+PHN0cm9uZz5TeW1ib2w6PC9zdHJvbmc+IHtkYXRhLmluZm8uc3ltYm9sfTwvZGl2PlxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPlRvdGFsIFN1cHBseTo8L3N0cm9uZz4ge2Zvcm1hdEJhbGFuY2UoZGF0YS5pbmZvLnRvdGFsX3N1cHBseSwgZGF0YS5pbmZvLmRlY2ltYWxzKX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7ZGF0YS5ob2xkZXJzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgbWItNFwiPlRvcCBUb2tlbiBIb2xkZXJzPC9oMj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtaW4tdy1mdWxsIGJnLXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJnLWdyYXktMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTIgdGV4dC1sZWZ0XCI+QWNjb3VudDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTIgdGV4dC1yaWdodFwiPkJhbGFuY2U8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0yIHRleHQtcmlnaHRcIj5QZXJjZW50YWdlPC90aD5cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAgICB7ZGF0YS5ob2xkZXJzLm1hcCgoaG9sZGVyLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtob2xkZXIuYWNjb3VudH0gY2xhc3NOYW1lPXtpbmRleCAlIDIgPT09IDAgPyAnYmctZ3JheS01MCcgOiAnJ30+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMlwiPntob2xkZXIuYWNjb3VudH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTIgdGV4dC1yaWdodCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRhLmluZm8gPyBmb3JtYXRCYWxhbmNlKGhvbGRlci5iYWxhbmNlLCBkYXRhLmluZm8uZGVjaW1hbHMpIDogaG9sZGVyLmJhbGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0yIHRleHQtcmlnaHRcIj57aG9sZGVyLnBlcmNlbnRhZ2UudG9GaXhlZCg0KX0lPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsImdldFRva2VuSG9sZGVycyIsImdldFRva2VuSW5mbyIsIkhvbWUiLCJ0b2tlbklkIiwic2V0VG9rZW5JZCIsImRhdGEiLCJzZXREYXRhIiwiaG9sZGVycyIsImluZm8iLCJlcnJvciIsImxvYWRpbmciLCJmb3JtYXRCYWxhbmNlIiwiYmFsYW5jZSIsImRlY2ltYWxzIiwidmFsdWUiLCJCaWdJbnQiLCJkaXZpc29yIiwiaW50ZWdlclBhcnQiLCJmcmFjdGlvbmFsUGFydCIsImZvcm1hdHRlZEZyYWN0aW9uYWwiLCJ0b1N0cmluZyIsInBhZFN0YXJ0IiwicmVwbGFjZSIsImZvcm1hdHRlZEludGVnZXIiLCJ0b0xvY2FsZVN0cmluZyIsImhhbmRsZVNlYXJjaCIsInByZXYiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsInN5bWJvbCIsInRvdGFsX3N1cHBseSIsInJlc3BvbnNlIiwibWFpbiIsImNsYXNzTmFtZSIsImRpdiIsImgxIiwiaW5wdXQiLCJ0eXBlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwicGxhY2Vob2xkZXIiLCJidXR0b24iLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJoMiIsInN0cm9uZyIsImxlbmd0aCIsInRhYmxlIiwidGhlYWQiLCJ0ciIsInRoIiwidGJvZHkiLCJtYXAiLCJob2xkZXIiLCJpbmRleCIsInRkIiwiYWNjb3VudCIsInBlcmNlbnRhZ2UiLCJ0b0ZpeGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/page.tsx\n"));

/***/ })

});