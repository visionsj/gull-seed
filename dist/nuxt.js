/*!
 * Nuxt.js v1.0.0-rc3
 * Released under the MIT License.
 */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _ = require('lodash');
var ___default = _interopDefault(_);
var path = require('path');
var path__default = _interopDefault(path);
var fs = require('fs');
var fs__default = _interopDefault(fs);
var hash = _interopDefault(require('hash-sum'));
var Tapable = _interopDefault(require('tappable'));
var Debug = _interopDefault(require('debug'));
var chalk = _interopDefault(require('chalk'));
var ansiHTML = _interopDefault(require('ansi-html'));
var serialize = _interopDefault(require('serialize-javascript'));
var generateETag = _interopDefault(require('etag'));
var fresh = _interopDefault(require('fresh'));
var pify = _interopDefault(require('pify'));
var serveStatic = _interopDefault(require('serve-static'));
var compression = _interopDefault(require('compression'));
var fs$1 = require('fs-extra');
var fs$1__default = _interopDefault(fs$1);
var vueServerRenderer = require('vue-server-renderer');
var connect = _interopDefault(require('connect'));
var enableDestroy = _interopDefault(require('server-destroy'));
var Module = _interopDefault(require('module'));
var chokidar = _interopDefault(require('chokidar'));
var webpack = _interopDefault(require('webpack'));
var MFS = _interopDefault(require('memory-fs'));
var webpackDevMiddleware = _interopDefault(require('webpack-dev-middleware'));
var webpackHotMiddleware = _interopDefault(require('webpack-hot-middleware'));
var Glob = _interopDefault(require('glob'));
var VueSSRClientPlugin = _interopDefault(require('vue-server-renderer/client-plugin'));
var HTMLPlugin = _interopDefault(require('html-webpack-plugin'));
var FriendlyErrorsWebpackPlugin = _interopDefault(require('friendly-errors-webpack-plugin'));
var ProgressBarPlugin = _interopDefault(require('progress-bar-webpack-plugin'));
var webpackBundleAnalyzer = require('webpack-bundle-analyzer');
var ExtractTextPlugin = _interopDefault(require('extract-text-webpack-plugin'));
var autoprefixer = _interopDefault(require('autoprefixer'));
var VueSSRServerPlugin = _interopDefault(require('vue-server-renderer/server-plugin'));
var nodeExternals = _interopDefault(require('webpack-node-externals'));
var htmlMinifier = require('html-minifier');

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = 'object' === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve$$1, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve$$1, reject);
          }, function(err) {
            invoke("throw", err, resolve$$1, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve$$1(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve$$1, reject) {
          invoke(method, arg, resolve$$1, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof commonjsGlobal === "object" ? commonjsGlobal :
  typeof window === "object" ? window :
  typeof self === "object" ? self : commonjsGlobal
);
});

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof commonjsGlobal === "object" ? commonjsGlobal :
  typeof window === "object" ? window :
  typeof self === "object" ? self : commonjsGlobal;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var index$1 = runtimeModule;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};









var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve$$1, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve$$1(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function encodeHtml(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getContext(req, res) {
  return { req: req, res: res };
}

function setAnsiColors(ansiHTML$$1) {
  ansiHTML$$1.setColors({
    reset: ['efefef', 'a6004c'],
    darkgrey: '5a012b',
    yellow: 'ffab07',
    green: 'aeefba',
    magenta: 'ff84bf',
    blue: '3505a0',
    cyan: '56eaec',
    red: '4e053a'
  });
}

var waitFor = function () {
  var _ref = asyncToGenerator(index$1.mark(function _callee(ms) {
    return index$1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve$$1) {
              setTimeout(resolve$$1, ms || 0);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function waitFor(_x) {
    return _ref.apply(this, arguments);
  };
}();

function urlJoin() {
  return [].slice.call(arguments).join('/').replace(/\/+/g, '/').replace(':/', '://');
}

function isUrl(url) {
  return url.indexOf('http') === 0 || url.indexOf('//') === 0;
}

function promisifyRoute(fn) {
  // If routes is an array
  if (Array.isArray(fn)) {
    return Promise.resolve(fn);
  }
  // If routes is a function expecting a callback
  if (fn.length === 1) {
    return new Promise(function (resolve$$1, reject) {
      fn(function (err, routeParams) {
        if (err) {
          reject(err);
        }
        resolve$$1(routeParams);
      });
    });
  }
  var promise = fn();
  if (!promise || !(promise instanceof Promise) && typeof promise.then !== 'function') {
    promise = Promise.resolve(promise);
  }
  return promise;
}

function sequence(tasks, fn) {
  return tasks.reduce(function (promise, task) {
    return promise.then(function () {
      return fn(task);
    });
  }, Promise.resolve());
}

function parallel(tasks, fn) {
  return Promise.all(tasks.map(function (task) {
    return fn(task);
  }));
}

function chainFn(base, fn) {
  /* istanbul ignore if */
  if (!(fn instanceof Function)) {
    return;
  }
  return function () {
    if (base instanceof Function) {
      base.apply(this, arguments);
    }
    fn.apply(this, arguments);
  };
}

function wp(p) {
  /* istanbul ignore if */
  if (/^win/.test(process.platform)) {
    p = p.replace(/\\/g, '\\\\');
  }
  return p;
}

var reqSep = /\//g;
var sysSep = ___default.escapeRegExp(path.sep);
var normalize = function normalize(string) {
  return string.replace(reqSep, sysSep);
};

function r() {
  var args = Array.prototype.slice.apply(arguments);
  var lastArg = ___default.last(args);

  if (lastArg.indexOf('@') !== -1 || lastArg.indexOf('~') !== -1) {
    return wp(lastArg);
  }

  return wp(path.resolve.apply(undefined, toConsumableArray(args.map(normalize))));
}

function relativeTo() {
  var args = Array.prototype.slice.apply(arguments);
  var dir = args.shift();

  // Resolve path
  var path$$1 = r.apply(undefined, toConsumableArray(args));

  // Check if path is an alias
  if (path$$1.indexOf('@') !== -1 || path$$1.indexOf('~') !== -1) {
    return path$$1;
  }

  // Make correct relative path
  var rp = path.relative(dir, path$$1);
  if (rp[0] !== '.') {
    rp = './' + rp;
  }
  return wp(rp);
}

function flatRoutes(router) {
  var path$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var routes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  router.forEach(function (r) {
    if (!(r.path.indexOf(':') !== -1) && !(r.path.indexOf('*') !== -1)) {
      /* istanbul ignore if */
      if (r.children) {
        flatRoutes(r.children, path$$1 + r.path + '/', routes);
      } else {
        routes.push((r.path === '' && path$$1[path$$1.length - 1] === '/' ? path$$1.slice(0, -1) : path$$1) + r.path);
      }
    }
  });
  return routes;
}

function cleanChildrenRoutes(routes) {
  var isChild = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var start = -1;
  var routesIndex = [];
  routes.forEach(function (route) {
    if (/-index$/.test(route.name) || route.name === 'index') {
      // Save indexOf 'index' key in name
      var res = route.name.split('-');
      var s = res.indexOf('index');
      start = start === -1 || s < start ? s : start;
      routesIndex.push(res);
    }
  });
  routes.forEach(function (route) {
    route.path = isChild ? route.path.replace('/', '') : route.path;
    if (route.path.indexOf('?') > -1) {
      var names = route.name.split('-');
      var paths = route.path.split('/');
      if (!isChild) {
        paths.shift();
      } // clean first / for parents
      routesIndex.forEach(function (r) {
        var i = r.indexOf('index') - start; //  children names
        if (i < paths.length) {
          for (var a = 0; a <= i; a++) {
            if (a === i) {
              paths[a] = paths[a].replace('?', '');
            }
            if (a < i && names[a] !== r[a]) {
              break;
            }
          }
        }
      });
      route.path = (isChild ? '' : '/') + paths.join('/');
    }
    route.name = route.name.replace(/-index$/, '');
    if (route.children) {
      if (route.children.find(function (child) {
        return child.path === '';
      })) {
        delete route.name;
      }
      route.children = cleanChildrenRoutes(route.children, true);
    }
  });
  return routes;
}

function createRoutes(files, srcDir) {
  var routes = [];
  files.forEach(function (file) {
    var keys = file.replace(/^pages/, '').replace(/\.vue$/, '').replace(/\/{2,}/g, '/').split('/').slice(1);
    var route = { name: '', path: '', component: r(srcDir, file) };
    var parent = routes;
    keys.forEach(function (key, i) {
      route.name = route.name ? route.name + '-' + key.replace('_', '') : key.replace('_', '');
      route.name += key === '_' ? 'all' : '';
      var child = ___default.find(parent, { name: route.name });
      if (child) {
        if (!child.children) {
          child.children = [];
        }
        parent = child.children;
        route.path = '';
      } else {
        if (key === 'index' && i + 1 === keys.length) {
          route.path += i > 0 ? '' : '/';
        } else {
          route.path += '/' + (key === '_' ? '*' : key.replace('_', ':'));
          if (key !== '_' && key.indexOf('_') !== -1) {
            route.path += '?';
          }
        }
      }
    });
    // Order Routes path
    parent.push(route);
    parent.sort(function (a, b) {
      if (!a.path.length || a.path === '/') {
        return -1;
      }
      if (!b.path.length || b.path === '/') {
        return 1;
      }
      var res = 0;
      var _a = a.path.split('/');
      var _b = b.path.split('/');
      for (var i = 0; i < _a.length; i++) {
        if (res !== 0) {
          break;
        }
        var y = _a[i].indexOf('*') > -1 ? 2 : _a[i].indexOf(':') > -1 ? 1 : 0;
        var z = _b[i].indexOf('*') > -1 ? 2 : _b[i].indexOf(':') > -1 ? 1 : 0;
        res = y - z;
        if (i === _b.length - 1 && res === 0) {
          res = 1;
        }
      }
      return res === 0 ? -1 : res;
    });
  });
  return cleanChildrenRoutes(routes);
}



var Utils = Object.freeze({
	encodeHtml: encodeHtml,
	getContext: getContext,
	setAnsiColors: setAnsiColors,
	waitFor: waitFor,
	urlJoin: urlJoin,
	isUrl: isUrl,
	promisifyRoute: promisifyRoute,
	sequence: sequence,
	parallel: parallel,
	chainFn: chainFn,
	wp: wp,
	r: r,
	relativeTo: relativeTo,
	flatRoutes: flatRoutes,
	cleanChildrenRoutes: cleanChildrenRoutes,
	createRoutes: createRoutes
});

function Options(_options) {
  // Clone options to prevent unwanted side-effects
  var options = Object.assign({}, _options);

  // Normalize options
  if (options.loading === true) {
    delete options.loading;
  }
  if (options.router && typeof options.router.middleware === 'string') {
    options.router.middleware = [options.router.middleware];
  }
  if (options.router && typeof options.router.base === 'string') {
    options._routerBaseSpecified = true;
  }
  if (typeof options.transition === 'string') {
    options.transition = { name: options.transition };
  }

  // Apply defaults
  ___default.defaultsDeep(options, defaultOptions);

  // Resolve dirs
  options.rootDir = typeof options.rootDir === 'string' && options.rootDir ? options.rootDir : process.cwd();
  options.srcDir = typeof options.srcDir === 'string' && options.srcDir ? path.resolve(options.rootDir, options.srcDir) : options.rootDir;
  options.buildDir = path.join(options.rootDir, options.buildDir);

  // If app.html is defined, set the template path to the user template
  options.appTemplatePath = path.resolve(options.buildDir, 'views/app.template.html');
  if (fs.existsSync(path.join(options.srcDir, 'app.html'))) {
    options.appTemplatePath = path.join(options.srcDir, 'app.html');
  }

  // Ignore publicPath on dev
  /* istanbul ignore if */
  if (options.dev && isUrl(options.build.publicPath)) {
    options.build.publicPath = defaultOptions.build.publicPath;
  }

  // If store defined, update store options to true unless explicitly disabled
  if (options.store !== false && fs.existsSync(path.join(options.srcDir, 'store'))) {
    options.store = true;
  }

  // Resolve mode
  var mode = options.mode;
  if (typeof mode === 'function') {
    mode = mode();
  }
  if (typeof mode === 'string') {
    mode = Modes[mode];
  }

  // Apply mode
  ___default.defaultsDeep(options, mode);

  return options;
}

var Modes = {
  universal: {
    build: {
      ssr: true
    },
    render: {
      ssr: true
    }
  },
  spa: {
    build: {
      ssr: false
    },
    render: {
      ssr: false
    }
  },
  static: {
    build: {
      ssr: true
    },
    render: {
      ssr: 'static'
    }
  }
};

var defaultOptions = {
  mode: 'universal',
  dev: process.env.NODE_ENV !== 'production',
  buildDir: '.gull',
  nuxtAppDir: path.resolve(__dirname, '../lib/app/'), // Relative to dist
  build: {
    analyze: false,
    extractCSS: false,
    ssr: undefined,
    publicPath: '/_gull/',
    filenames: {
      css: 'common.[chunkhash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'vendor.bundle.[chunkhash].js',
      app: 'nuxt.bundle.[chunkhash].js'
    },
    vendor: [],
    plugins: [],
    babel: {},
    postcss: undefined,
    templates: [],
    watch: [],
    devMiddleware: {},
    hotMiddleware: {}
  },
  generate: {
    dir: 'dist',
    routes: [],
    concurrency: 500,
    interval: 0,
    minify: {
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeAttributeQuotes: false,
      removeComments: false,
      removeEmptyAttributes: true,
      removeOptionalTags: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      removeTagWhitespace: false,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },
  env: {},
  head: {
    meta: [],
    link: [],
    style: [],
    script: []
  },
  plugins: [],
  css: [],
  modules: [],
  layouts: {},
  serverMiddleware: [],
  ErrorPage: null,
  loading: {
    color: 'black',
    failedColor: 'red',
    height: '2px',
    duration: 5000
  },
  transition: {
    name: 'page',
    mode: 'out-in'
  },
  router: {
    mode: 'history',
    base: '/',
    routes: [],
    middleware: [],
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    extendRoutes: null,
    scrollBehavior: null,
    fallback: false
  },
  render: {
    bundleRenderer: {},
    resourceHints: true,
    ssr: undefined,
    http2: {
      push: false
    },
    static: {},
    gzip: {
      threshold: 0
    },
    etag: {
      weak: true // Faster for responses > 5KB
    }
  },
  watchers: {
    webpack: {},
    chokidar: {}
  }
};

var debug = Debug('nuxt:module');

var ModuleContainer = function (_Tapable) {
  inherits(ModuleContainer, _Tapable);

  function ModuleContainer(nuxt) {
    classCallCheck(this, ModuleContainer);

    var _this = possibleConstructorReturn(this, (ModuleContainer.__proto__ || Object.getPrototypeOf(ModuleContainer)).call(this));

    _this.nuxt = nuxt;
    _this.options = nuxt.options;
    _this.requiredModules = [];
    return _this;
  }

  createClass(ModuleContainer, [{
    key: '_ready',
    value: function () {
      var _ref = asyncToGenerator(index$1.mark(function _callee() {
        return index$1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return sequence(this.options.modules, this.addModule.bind(this));

              case 2:
                _context.next = 4;
                return this.nuxt.applyPluginsAsync('module', this);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _ready() {
        return _ref.apply(this, arguments);
      }

      return _ready;
    }()
  }, {
    key: 'addVendor',
    value: function addVendor(vendor) {
      /* istanbul ignore if */
      if (!vendor) {
        return;
      }
      this.options.build.vendor = _.uniq(this.options.build.vendor.concat(vendor));
    }
  }, {
    key: 'addTemplate',
    value: function addTemplate(template) {
      /* istanbul ignore if */
      if (!template) {
        return;
      }
      // Validate & parse source
      var src = template.src || template;
      var srcPath = path__default.parse(src);
      /* istanbul ignore if */
      if (!src || typeof src !== 'string' || !fs__default.existsSync(src)) {
        /* istanbul ignore next */
        debug('[nuxt] invalid template', template);
        return;
      }
      // Generate unique and human readable dst filename
      var dst = template.fileName || path__default.basename(srcPath.dir) + '.' + srcPath.name + '.' + hash(src) + srcPath.ext;
      // Add to templates list
      var templateObj = {
        src: src,
        dst: dst,
        options: template.options
      };
      this.options.build.templates.push(templateObj);
      return templateObj;
    }
  }, {
    key: 'addPlugin',
    value: function addPlugin(template) {
      var _addTemplate = this.addTemplate(template),
          dst = _addTemplate.dst;
      // Add to nuxt plugins


      this.options.plugins.unshift({
        src: path__default.join(this.options.buildDir, dst),
        ssr: template.ssr
      });
    }
  }, {
    key: 'addServerMiddleware',
    value: function addServerMiddleware(middleware) {
      this.options.serverMiddleware.push(middleware);
    }
  }, {
    key: 'extendBuild',
    value: function extendBuild(fn) {
      this.options.build.extend = chainFn(this.options.build.extend, fn);
    }
  }, {
    key: 'extendRoutes',
    value: function extendRoutes(fn) {
      this.options.router.extendRoutes = chainFn(this.options.router.extendRoutes, fn);
    }
  }, {
    key: 'requireModule',
    value: function requireModule(moduleOpts) {
      // Require once
      return this.addModule(moduleOpts, true);
    }
  }, {
    key: 'addModule',
    value: function () {
      var _ref2 = asyncToGenerator(index$1.mark(function _callee2(moduleOpts, requireOnce) {
        var _this2 = this;

        var options, originalSrc, module, alreadyRequired;
        return index$1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (moduleOpts) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return');

              case 2:
                _context2.next = 4;
                return this.applyPluginsAsync('add', { moduleOpts: moduleOpts, requireOnce: requireOnce });

              case 4:

                // Allow using babel style array options
                if (Array.isArray(moduleOpts)) {
                  moduleOpts = {
                    src: moduleOpts[0],
                    options: moduleOpts[1]
                  };
                }

                // Allows passing runtime options to each module
                options = moduleOpts.options || ((typeof moduleOpts === 'undefined' ? 'undefined' : _typeof(moduleOpts)) === 'object' ? moduleOpts : {});
                originalSrc = moduleOpts.src || moduleOpts;

                // Resolve module

                module = originalSrc;

                if (typeof module === 'string') {
                  module = require(this.nuxt.resolvePath(module));
                }

                // Validate module
                /* istanbul ignore if */

                if (!(typeof module !== 'function')) {
                  _context2.next = 11;
                  break;
                }

                throw new Error('[nuxt] Module ' + JSON.stringify(originalSrc) + ' should export a function');

              case 11:

                // Module meta
                if (!module.meta) {
                  module.meta = {};
                }

                if (!module.meta.name) {
                  _context2.next = 17;
                  break;
                }

                alreadyRequired = this.requiredModules.indexOf(module.meta.name) !== -1;

                if (!(requireOnce && alreadyRequired)) {
                  _context2.next = 16;
                  break;
                }

                return _context2.abrupt('return');

              case 16:
                if (!alreadyRequired) {
                  this.requiredModules.push(module.meta.name);
                }

              case 17:
                return _context2.abrupt('return', new Promise(function (resolve$$1, reject) {
                  var result = module.call(_this2, options, function (err) {
                    /* istanbul ignore if */
                    if (err) {
                      return reject(err);
                    }
                    resolve$$1(module);
                  });
                  // If module send back a promise
                  if (result && result.then instanceof Function) {
                    return result.then(resolve$$1);
                  }
                  // If not expecting a callback but returns no promise (=synchronous)
                  if (module.length < 2) {
                    return resolve$$1(module);
                  }
                }));

              case 18:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addModule(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return addModule;
    }()
  }]);
  return ModuleContainer;
}(Tapable);

var debug$2 = Debug('nuxt:render');
debug$2.color = 4; // Force blue color

setAnsiColors(ansiHTML);

var jsdom = null;

var Renderer = function (_Tapable) {
  inherits(Renderer, _Tapable);

  function Renderer(nuxt) {
    classCallCheck(this, Renderer);

    var _this = possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this));

    _this.nuxt = nuxt;
    _this.options = nuxt.options;

    // Will be set by createRenderer
    _this.bundleRenderer = null;

    // Will be available on dev
    _this.webpackDevMiddleware = null;
    _this.webpackHotMiddleware = null;

    // Create new connect instance
    _this.app = connect();

    // Renderer runtime resources
    _this.resources = {
      clientManifest: null,
      serverBundle: null,
      ssrTemplate: null,
      spaTemplate: null,
      errorTemplate: parseTemplate('<pre>{{ stack }}</pre>') // Will be loaded on ready


      // Bind middleware to this context
    };_this.nuxtMiddleware = _this.nuxtMiddleware.bind(_this);
    _this.errorMiddleware = _this.errorMiddleware.bind(_this);
    return _this;
  }

  createClass(Renderer, [{
    key: '_ready',
    value: function () {
      var _ref = asyncToGenerator(index$1.mark(function _callee() {
        var errorTemplatePath;
        return index$1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.setupMiddleware();

              case 2:

                // Load error template
                errorTemplatePath = path.resolve(this.options.buildDir, 'views/error.html');

                if (fs$1__default.existsSync(errorTemplatePath)) {
                  this.resources.errorTemplate = parseTemplate(fs$1__default.readFileSync(errorTemplatePath, 'utf8'));
                }

                // Load SSR resources from fs

                if (this.options.dev) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return this.loadResources();

              case 7:
                _context.next = 9;
                return this.nuxt.applyPluginsAsync('renderer', this);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _ready() {
        return _ref.apply(this, arguments);
      }

      return _ready;
    }()
  }, {
    key: 'loadResources',
    value: function () {
      var _ref2 = asyncToGenerator(index$1.mark(function _callee2() {
        var _this2 = this;

        var _fs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fs$1__default;

        var distPath, updated;
        return index$1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                distPath = path.resolve(this.options.buildDir, 'dist');
                updated = [];


                resourceMap.forEach(function (_ref3) {
                  var key = _ref3.key,
                      fileName = _ref3.fileName,
                      transform = _ref3.transform;

                  var rawKey = '$$' + key;
                  var path$$1 = path.join(distPath, fileName);

                  var rawData = void 0,
                      data = void 0;
                  if (!_fs.existsSync(path$$1)) {
                    return; // Resource not exists
                  }
                  rawData = _fs.readFileSync(path$$1, 'utf8');
                  if (!rawData || rawData === _this2.resources[rawKey]) {
                    return; // No changes
                  }
                  _this2.resources[rawKey] = rawData;
                  data = transform(rawData);
                  /* istanbul ignore if */
                  if (!data) {
                    return; // Invalid data ?
                  }
                  _this2.resources[key] = data;
                  updated.push(key);
                });

                if (updated.length > 0) {
                  // debug('Updated', updated.join(', '), isServer)
                  this.createRenderer();
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadResources() {
        return _ref2.apply(this, arguments);
      }

      return loadResources;
    }()
  }, {
    key: 'createRenderer',
    value: function createRenderer() {
      // Skip if SSR is disabled
      if (this.noSSR) {
        return;
      }

      // If resources are not yet provided
      if (!this.resources.serverBundle || !this.resources.clientManifest) {
        return;
      }

      // Create bundle renderer for SSR
      this.bundleRenderer = vueServerRenderer.createBundleRenderer(this.resources.serverBundle, Object.assign({
        clientManifest: this.resources.clientManifest,
        runInNewContext: false,
        basedir: this.options.rootDir
      }, this.options.render.bundleRenderer));

      // Promisify renderToString
      this.bundleRenderer.renderToString = pify(this.bundleRenderer.renderToString);
    }
  }, {
    key: 'useMiddleware',
    value: function useMiddleware(m) {
      // Resolve
      if (typeof m === 'string') {
        m = require(this.nuxt.resolvePath(m));
      }
      // Use middleware
      if (m instanceof Function) {
        this.app.use(m);
      } else if (m && m.path && m.handler) {
        this.app.use(m.path, m.handler);
      }
    }
  }, {
    key: 'setupMiddleware',
    value: function () {
      var _ref4 = asyncToGenerator(index$1.mark(function _callee4() {
        var _this3 = this;

        var distDir;
        return index$1.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.applyPluginsAsync('setupMiddleware', this.app);

              case 2:

                // Gzip middleware for production
                if (!this.options.dev && this.options.render.gzip) {
                  this.useMiddleware(compression(this.options.render.gzip));
                }

                // Common URL checks
                this.useMiddleware(function (req, res, next) {
                  // If base in req.url, remove it for the middleware and vue-router
                  if (_this3.options.router.base !== '/' && req.url.indexOf(_this3.options.router.base) === 0) {
                    req.url = req.url.replace(_this3.options.router.base, '/');
                  }
                  // Prevent access to SSR resources
                  if (ssrResourceRegex.test(req.url)) {
                    res.statusCode = 404;
                    return res.end();
                  }
                  next();
                });

                // Add webpack middleware only for development
                if (this.options.dev) {
                  this.useMiddleware(function () {
                    var _ref5 = asyncToGenerator(index$1.mark(function _callee3(req, res, next) {
                      return index$1.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              if (!_this3.webpackDevMiddleware) {
                                _context3.next = 3;
                                break;
                              }

                              _context3.next = 3;
                              return _this3.webpackDevMiddleware(req, res);

                            case 3:
                              if (!_this3.webpackHotMiddleware) {
                                _context3.next = 6;
                                break;
                              }

                              _context3.next = 6;
                              return _this3.webpackHotMiddleware(req, res);

                            case 6:
                              next();

                            case 7:
                            case 'end':
                              return _context3.stop();
                          }
                        }
                      }, _callee3, _this3);
                    }));

                    return function (_x2, _x3, _x4) {
                      return _ref5.apply(this, arguments);
                    };
                  }());
                }

                // For serving static/ files to /
                this.useMiddleware(serveStatic(path.resolve(this.options.srcDir, 'static'), this.options.render.static));

                // Serve .nuxt/dist/ files only for production
                // For dev they will be served with devMiddleware
                if (!this.options.dev) {
                  distDir = path.resolve(this.options.buildDir, 'dist');

                  this.useMiddleware({
                    path: isUrl(this.options.build.publicPath) ? defaultOptions.build.publicPath : this.options.build.publicPath,
                    handler: serveStatic(distDir, {
                      index: false, // Don't serve index.html template
                      maxAge: this.options.dev ? 0 : '1y' // 1 year in production
                    })
                  });
                }

                // Add User provided middleware
                this.options.serverMiddleware.forEach(function (m) {
                  _this3.useMiddleware(m);
                });

                // Finally use nuxtMiddleware
                this.useMiddleware(this.nuxtMiddleware);

                // Error middleware for errors that occurred in middleware that declared above
                this.useMiddleware(this.errorMiddleware);

              case 10:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setupMiddleware() {
        return _ref4.apply(this, arguments);
      }

      return setupMiddleware;
    }()
  }, {
    key: 'nuxtMiddleware',
    value: function () {
      var _ref6 = asyncToGenerator(index$1.mark(function _callee5(req, res, next) {
        var context, _ref7, html, error, redirected, resourceHints, etag, regex, pushAssets, m, _m, _m2, _2, rel, href, as;

        return index$1.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // Get context
                context = getContext(req, res);

                res.statusCode = 200;
                _context5.prev = 2;
                _context5.next = 5;
                return this.renderRoute(req.url, context);

              case 5:
                _ref7 = _context5.sent;
                html = _ref7.html;
                error = _ref7.error;
                redirected = _ref7.redirected;
                resourceHints = _ref7.resourceHints;

                if (!redirected) {
                  _context5.next = 12;
                  break;
                }

                return _context5.abrupt('return', html);

              case 12:
                if (error) {
                  res.statusCode = context.nuxt.error.statusCode || 500;
                }

                // Add ETag header

                if (!(!error && this.options.render.etag)) {
                  _context5.next = 20;
                  break;
                }

                etag = generateETag(html, this.options.render.etag);

                if (!fresh(req.headers, { etag: etag })) {
                  _context5.next = 19;
                  break;
                }

                res.statusCode = 304;
                res.end();
                return _context5.abrupt('return');

              case 19:
                res.setHeader('ETag', etag);

              case 20:

                // HTTP2 push headers
                if (!error && this.options.render.http2.push) {
                  // Parse resourceHints to extract HTTP.2 prefetch/push headers
                  // https://w3c.github.io/preload/#server-push-http-2
                  regex = /link rel="([^"]*)" href="([^"]*)" as="([^"]*)"/g;
                  pushAssets = [];
                  m = void 0;

                  while (m = regex.exec(resourceHints)) {
                    // eslint-disable-line no-cond-assign
                    _m = m, _m2 = slicedToArray(_m, 4), _2 = _m2[0], rel = _m2[1], href = _m2[2], as = _m2[3]; // eslint-disable-line no-unused-vars

                    if (rel === 'preload') {
                      pushAssets.push('<' + href + '>; rel=' + rel + '; as=' + as);
                    }
                  }
                  // Pass with single Link header
                  // https://blog.cloudflare.com/http-2-server-push-with-multiple-assets-per-link-header
                  res.setHeader('Link', pushAssets.join(','));
                }

                // Send response
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.setHeader('Content-Length', Buffer.byteLength(html));
                res.end(html, 'utf8');
                return _context5.abrupt('return', html);

              case 27:
                _context5.prev = 27;
                _context5.t0 = _context5['catch'](2);

                next(this.errorMiddleware(_context5.t0, req, res, next, context));

              case 30:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 27]]);
      }));

      function nuxtMiddleware(_x5, _x6, _x7) {
        return _ref6.apply(this, arguments);
      }

      return nuxtMiddleware;
    }()
  }, {
    key: 'errorMiddleware',
    value: function () {
      var _ref8 = asyncToGenerator(index$1.mark(function _callee6(err, req, res, next, context) {
        var html;
        return index$1.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(context && context.redirected)) {
                  _context6.next = 3;
                  break;
                }

                console.error(err); // eslint-disable-line no-console
                return _context6.abrupt('return', err);

              case 3:

                // Render error template
                html = this.resources.errorTemplate({
                  error: err,
                  stack: ansiHTML(encodeHtml(err.stack))
                });
                // Send response

                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.setHeader('Content-Length', Buffer.byteLength(html));
                res.end(html, 'utf8');
                return _context6.abrupt('return', err);

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function errorMiddleware(_x8, _x9, _x10, _x11, _x12) {
        return _ref8.apply(this, arguments);
      }

      return errorMiddleware;
    }()
  }, {
    key: 'renderRoute',
    value: function () {
      var _ref9 = asyncToGenerator(index$1.mark(function _callee7(url) {
        var _this4 = this;

        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var _APP, _HEAD, _html, APP, m, HEAD, resourceHints, html;

        return index$1.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (this.isReady) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt('return', new Promise(function (resolve$$1) {
                  setTimeout(function () {
                    return resolve$$1(_this4.renderRoute(url, context));
                  }, 1000);
                }));

              case 2:

                // Log rendered url
                debug$2('Rendering url ' + url);

                // Add url and isSever to the context
                context.url = url;
                context.isServer = true;

                // Basic response if SSR is disabled

                if (!this.noSSR) {
                  _context7.next = 10;
                  break;
                }

                _APP = '<div id="__nuxt"></div>';
                _HEAD = '';
                _html = this.resources.spaTemplate({
                  HTML_ATTRS: '',
                  BODY_ATTRS: '',
                  HEAD: _HEAD,
                  APP: _APP
                });
                return _context7.abrupt('return', {
                  html: _html
                });

              case 10:
                _context7.next = 12;
                return this.bundleRenderer.renderToString(context);

              case 12:
                APP = _context7.sent;


                if (!context.nuxt.serverRendered) {
                  APP = '<div id="__nuxt"></div>';
                }
                m = context.meta.inject();
                HEAD = m.meta.text() + m.title.text() + m.link.text() + m.style.text() + m.script.text() + m.noscript.text();

                if (this.options._routerBaseSpecified) {
                  HEAD += '<base href="' + this.options.router.base + '">';
                }

                resourceHints = '';


                if (!this.staticSSR) {
                  if (this.options.render.resourceHints) {
                    resourceHints = context.renderResourceHints();
                    HEAD += resourceHints;
                  }
                  APP += '<script type="text/javascript">window.__NUXT__=' + serialize(context.nuxt, { isJSON: true }) + ';</script>';
                  APP += context.renderScripts();
                }

                HEAD += context.renderStyles();

                html = this.resources.ssrTemplate({
                  HTML_ATTRS: 'data-n-head-ssr ' + m.htmlAttrs.text(),
                  BODY_ATTRS: m.bodyAttrs.text(),
                  HEAD: HEAD,
                  APP: APP
                });
                return _context7.abrupt('return', {
                  html: html,
                  resourceHints: resourceHints,
                  error: context.nuxt.error,
                  redirected: context.redirected
                });

              case 22:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function renderRoute(_x13) {
        return _ref9.apply(this, arguments);
      }

      return renderRoute;
    }()
  }, {
    key: 'renderAndGetWindow',
    value: function () {
      var _ref10 = asyncToGenerator(index$1.mark(function _callee8(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var options, _ref11, window, nuxtExists, error;

        return index$1.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (jsdom) {
                  _context8.next = 11;
                  break;
                }

                _context8.prev = 1;

                jsdom = require('jsdom');
                _context8.next = 11;
                break;

              case 5:
                _context8.prev = 5;
                _context8.t0 = _context8['catch'](1);

                console.error('Fail when calling nuxt.renderAndGetWindow(url)'); // eslint-disable-line no-console
                console.error('jsdom module is not installed'); // eslint-disable-line no-console
                console.error('Please install jsdom with: npm install --save-dev jsdom'); // eslint-disable-line no-console
                throw _context8.t0;

              case 11:
                options = {
                  resources: 'usable', // load subresources (https://github.com/tmpvar/jsdom#loading-subresources)
                  runScripts: 'dangerously',
                  beforeParse: function beforeParse(window) {
                    // Mock window.scrollTo
                    window.scrollTo = function () {};
                  }
                };

                if (opts.virtualConsole !== false) {
                  options.virtualConsole = new jsdom.VirtualConsole().sendTo(console);
                }
                url = url || 'http://localhost:3000';
                _context8.next = 16;
                return jsdom.JSDOM.fromURL(url, options);

              case 16:
                _ref11 = _context8.sent;
                window = _ref11.window;

                // If Nuxt could not be loaded (error from the server-side)
                nuxtExists = window.document.body.innerHTML.indexOf('window.__NUXT__') !== -1;
                /* istanbul ignore if */

                if (nuxtExists) {
                  _context8.next = 23;
                  break;
                }

                error = new Error('Could not load the nuxt app');

                error.body = window.document.body.innerHTML;
                throw error;

              case 23:
                _context8.next = 25;
                return new Promise(function (resolve$$1) {
                  window._onNuxtLoaded = function () {
                    return resolve$$1(window);
                  };
                });

              case 25:
                return _context8.abrupt('return', window);

              case 26:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this, [[1, 5]]);
      }));

      function renderAndGetWindow(_x15) {
        return _ref10.apply(this, arguments);
      }

      return renderAndGetWindow;
    }()
  }, {
    key: 'noSSR',
    get: function get$$1() {
      return this.options.render.ssr === false;
    }
  }, {
    key: 'staticSSR',
    get: function get$$1() {
      return this.options.render.ssr === 'static';
    }
  }, {
    key: 'isReady',
    get: function get$$1() {
      if (this.noSSR) {
        return this.resources.spaTemplate;
      }
      return this.bundleRenderer && this.resources.ssrTemplate;
    }
  }]);
  return Renderer;
}(Tapable);

var parseTemplate = function parseTemplate(templateStr) {
  return ___default.template(templateStr, {
    interpolate: /{{([\s\S]+?)}}/g
  });
};

var resourceMap = [{
  key: 'clientManifest',
  fileName: 'vue-ssr-client-manifest.json',
  transform: JSON.parse
}, {
  key: 'serverBundle',
  fileName: 'server-bundle.json',
  transform: JSON.parse
}, {
  key: 'ssrTemplate',
  fileName: 'index.ssr.html',
  transform: parseTemplate
}, {
  key: 'spaTemplate',
  fileName: 'index.spa.html',
  transform: parseTemplate
}];

// Protector utility against request to SSR bundle files
var ssrResourceRegex = new RegExp(resourceMap.map(function (resource) {
  return resource.fileName;
}).join('|'), 'i');

var debug$1 = Debug('nuxt:');
debug$1.color = 5;

var Nuxt = function (_Tapable) {
  inherits(Nuxt, _Tapable);

  function Nuxt() {
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    classCallCheck(this, Nuxt);

    var _this = possibleConstructorReturn(this, (Nuxt.__proto__ || Object.getPrototypeOf(Nuxt)).call(this));

    _this.options = Options(_options);

    // Paths for resolving requires from `rootDir`
    _this.nodeModulePaths = Module._nodeModulePaths(_this.options.rootDir);

    _this.initialized = false;
    _this.errorHandler = _this.errorHandler.bind(_this);

    // Create instance of core components
    _this.moduleContainer = new ModuleContainer(_this);
    _this.renderer = new Renderer(_this);

    // Backward compatibility
    _this.render = _this.renderer.app;
    _this.renderRoute = _this.renderer.renderRoute.bind(_this.renderer);
    _this.renderAndGetWindow = _this.renderer.renderAndGetWindow.bind(_this.renderer);

    _this._ready = _this.ready().catch(_this.errorHandler);
    return _this;
  }

  createClass(Nuxt, [{
    key: 'ready',
    value: function () {
      var _ref = asyncToGenerator(index$1.mark(function _callee() {
        return index$1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._ready) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this._ready);

              case 2:
                _context.next = 4;
                return this.moduleContainer._ready();

              case 4:
                _context.next = 6;
                return this.applyPluginsAsync('ready');

              case 6:
                _context.next = 8;
                return this.renderer._ready();

              case 8:

                this.initialized = true;
                return _context.abrupt('return', this);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function ready() {
        return _ref.apply(this, arguments);
      }

      return ready;
    }()
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
      var host = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'localhost';

      return new Promise(function (resolve$$1, reject) {
        var server = _this2.renderer.app.listen({ port: port, host: host, exclusive: false }, function (err) {
          /* istanbul ignore if */
          if (err) {
            return reject(err);
          }

          // Show Open URL
          var _host = host === '0.0.0.0' ? 'localhost' : host;
          // eslint-disable-next-line no-console
          console.log('\n' + chalk.bold(chalk.bgBlue.black(' OPEN ') + chalk.blue(' http://' + _host + ':' + port + '\n')));

          // Close server on nuxt close
          _this2.plugin('close', function () {
            return new Promise(function (resolve$$1, reject) {
              // Destroy server by forcing every connection to be closed
              server.destroy(function (err) {
                debug$1('server closed');
                /* istanbul ignore if */
                if (err) {
                  return reject(err);
                }
                resolve$$1();
              });
            });
          });

          resolve$$1();
        });

        // Add server.destroy(cb) method
        enableDestroy(server);
      });
    }
  }, {
    key: 'errorHandler',
    value: function errorHandler() /* istanbul ignore next */{
      var _console;

      // Apply plugins
      // eslint-disable-next-line no-console
      this.applyPluginsAsync.apply(this, ['error'].concat(Array.prototype.slice.call(arguments))).catch(console.error);

      // Silent
      if (this.options.errorHandler === false) {
        return;
      }

      // Custom errorHandler
      if (typeof this.options.errorHandler === 'function') {
        return this.options.errorHandler.apply(this, arguments);
      }

      // Default handler
      // eslint-disable-next-line no-console
      (_console = console).error.apply(_console, arguments);
    }
  }, {
    key: 'resolvePath',
    value: function resolvePath(path$$1) {
      // Try to resolve using NPM resolve path first
      try {
        var resolvedPath = Module._resolveFilename(path$$1, { paths: this.nodeModulePaths });
        return resolvedPath;
      } catch (e) {}
      // Just continue

      // Shorthand to resolve from project dirs
      if (path$$1.indexOf('@@') === 0 || path$$1.indexOf('~~') === 0) {
        return path.join(this.options.rootDir, path$$1.substr(2));
      } else if (path$$1.indexOf('@') === 0 || path$$1.indexOf('~') === 0) {
        return path.join(this.options.srcDir, path$$1.substr(1));
      }
      return path.resolve(this.options.srcDir, path$$1);
    }
  }, {
    key: 'close',
    value: function () {
      var _ref2 = asyncToGenerator(index$1.mark(function _callee2(callback) {
        return index$1.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.applyPluginsAsync('close');

              case 2:
                if (!(typeof callback === 'function')) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 5;
                return callback();

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function close(_x4) {
        return _ref2.apply(this, arguments);
      }

      return close;
    }()
  }]);
  return Nuxt;
}(Tapable);

var core = {
  Options: Options,
  ModuleContainer: ModuleContainer,
  Nuxt: Nuxt,
  Renderer: Renderer,
  Utils: Utils
};

function extractStyles() {
  return !this.options.dev && this.options.build.extractCSS;
}

function styleLoader(ext) {
  var loader = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (extractStyles.call(this)) {
    return ExtractTextPlugin.extract({
      use: ['css-loader?minify&sourceMap'].concat(loader),
      fallback: 'vue-style-loader?sourceMap'
    });
  }
  return ['vue-style-loader?sourceMap', 'css-loader?sourceMap'].concat(loader);
}

var vueLoaderConfig = function (_ref) {
  var isClient = _ref.isClient;

  var babelOptions = JSON.stringify(_.defaults(this.options.build.babel, {
    presets: ['vue-app'],
    babelrc: false,
    cacheDirectory: !!this.options.dev
  }));

  // https://github.com/vuejs/vue-loader/blob/master/docs/en/configurations
  var config = {
    postcss: this.options.build.postcss,
    loaders: {
      'js': 'babel-loader?' + babelOptions,
      'css': styleLoader.call(this, 'css'),
      'less': styleLoader.call(this, 'less', 'less-loader'),
      'sass': styleLoader.call(this, 'sass', 'sass-loader?indentedSyntax&sourceMap'),
      'scss': styleLoader.call(this, 'sass', 'sass-loader?sourceMap'),
      'stylus': styleLoader.call(this, 'stylus', 'stylus-loader'),
      'styl': styleLoader.call(this, 'stylus', 'stylus-loader')
    },
    preserveWhitespace: false,
    extractCSS: extractStyles.call(this)

    // Return the config
  };return config;
};

/*
|--------------------------------------------------------------------------
| Webpack Shared Config
|
| This is the config which is extended by the server and client
| webpack config files
|--------------------------------------------------------------------------
*/
function webpackBaseConfig(_ref) {
  var isClient = _ref.isClient,
      isServer = _ref.isServer;

  var nodeModulesDir = path.join(__dirname, '..', 'node_modules');

  /* istanbul ignore if */
  if (!Array.isArray(this.options.build.postcss)) {
    this.options.build.postcss = [autoprefixer({
      browsers: ['last 3 versions']
    })];
  }

  var config = {
    devtool: this.options.dev ? 'cheap-module-source-map' : 'nosources-source-map',
    entry: {
      vendor: ['vue', 'vue-router', 'vue-meta']
    },
    output: {
      path: path.resolve(this.options.buildDir, 'dist'),
      filename: this.options.build.filenames.app,
      publicPath: isUrl(this.options.build.publicPath) ? this.options.build.publicPath : urlJoin(this.options.router.base, this.options.build.publicPath)
    },
    performance: {
      maxEntrypointSize: 1000000,
      maxAssetSize: 300000,
      hints: this.options.dev ? false : 'warning'
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.ts'],
      alias: {
        '~': path.join(this.options.srcDir),
        '~~': path.join(this.options.rootDir),
        '@': path.join(this.options.srcDir),
        '@@': path.join(this.options.rootDir),
        'static': path.join(this.options.srcDir, 'static'), // use in template with <img src="~static/nuxt.png" />
        'assets': path.join(this.options.srcDir, 'assets') // use in template with <img src="~assets/nuxt.png" />
      },
      modules: [path.join(this.options.rootDir, 'node_modules'), nodeModulesDir]
    },
    resolveLoader: {
      modules: [path.join(this.options.rootDir, 'node_modules'), nodeModulesDir]
    },
    module: {
      noParse: /es6-promise\.js$/, // avoid webpack shimming process
      rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        query: vueLoaderConfig.call(this, { isClient: isClient, isServer: isServer })
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: _.defaults(this.options.build.babel, {
          presets: ['vue-app'],
          babelrc: false,
          cacheDirectory: !!this.options.dev
        })
      }, { test: /\.css$/, use: styleLoader.call(this, 'css') }, { test: /\.less$/, use: styleLoader.call(this, 'less', 'less-loader') }, { test: /\.sass$/, use: styleLoader.call(this, 'sass', 'sass-loader?indentedSyntax&sourceMap') }, { test: /\.scss$/, use: styleLoader.call(this, 'sass', 'sass-loader?sourceMap') }, { test: /\.styl(us)?$/, use: styleLoader.call(this, 'stylus', 'stylus-loader') }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }]
    },
    plugins: this.options.build.plugins

    // CSS extraction
  };if (extractStyles.call(this)) {
    config.plugins.push(new ExtractTextPlugin({ filename: this.options.build.filenames.css }));
  }

  // Workaround for hiding Warnings about plugins without a default export (#1179)
  config.plugins.push({
    apply: function apply(compiler) {
      compiler.plugin('done', function (stats) {
        stats.compilation.warnings = stats.compilation.warnings.filter(function (warn) {
          if (warn.name === 'ModuleDependencyWarning' && warn.message.indexOf('export \'default\'') !== -1 && warn.message.indexOf('plugin') !== -1) {
            return false;
          }
          return true;
        });
      });
    }
  });

  // --------------------------------------
  // Dev specific config
  // --------------------------------------
  if (this.options.dev) {}
  //


  // --------------------------------------
  // Production specific config
  // --------------------------------------
  if (!this.options.dev) {
    // This is needed in webpack 2 for minify CSS
    config.plugins.push(new webpack.LoaderOptionsPlugin({
      minimize: true
    }));

    // Scope Hoisting
    // config.plugins.push(
    //   new webpack.optimize.ModuleConcatenationPlugin()
    // )
  }

  // Clone deep avoid leaking config between Client and Server
  return _.cloneDeep(config);
}

/*
|--------------------------------------------------------------------------
| Webpack Client Config
|
| Generate public/dist/client-vendor-bundle.js
| Generate public/dist/client-bundle.js
|
| In production, will generate public/dist/style.css
|--------------------------------------------------------------------------
*/
function webpackClientConfig() {
  var config = webpackBaseConfig.call(this, { isClient: true });

  config.name = 'client';

  // Entry
  config.entry.app = path.resolve(this.options.buildDir, 'client.js');

  // Add vendors
  if (this.options.store) {
    config.entry.vendor.push('vuex');
  }
  config.entry.vendor = config.entry.vendor.concat(this.options.build.vendor);
  // Extract vendor chunks for better caching
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: this.options.build.filenames.vendor,
    minChunks: function minChunks(module) {
      // A module is extracted into the vendor chunk when...
      return (
        // If it's inside node_modules
        /node_modules/.test(module.context) &&
        // Do not externalize if the request is a CSS file
        !/\.(css|less|scss|sass|styl|stylus)$/.test(module.request)
      );
    }
  }));

  // Env object defined in nuxt.config.js
  var env = {};
  _.each(this.options.env, function (value, key) {
    env['process.env.' + key] = typeof value === 'string' ? JSON.stringify(value) : value;
  });

  // Webpack common plugins
  /* istanbul ignore if */
  if (!Array.isArray(config.plugins)) {
    config.plugins = [];
  }

  // Generate output HTML for SSR
  if (this.options.build.ssr) {
    config.plugins.push(new HTMLPlugin({
      filename: 'index.ssr.html',
      template: this.options.appTemplatePath,
      inject: false // Resources will be injected using bundleRenderer
    }));
  }

  // Generate output HTML for SPA
  config.plugins.push(new HTMLPlugin({
    filename: 'index.spa.html',
    template: this.options.appTemplatePath,
    inject: true,
    chunksSortMode: 'dependency'
  }));

  // Generate vue-ssr-client-manifest
  config.plugins.push(new VueSSRClientPlugin({
    filename: 'vue-ssr-client-manifest.json'
  }));

  // Extract webpack runtime & manifest
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity,
    filename: this.options.build.filenames.manifest
  }));

  // Define Env
  config.plugins.push(new webpack.DefinePlugin(Object.assign(env, {
    'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || (this.options.dev ? 'development' : 'production')),
    'process.env.VUE_ENV': JSON.stringify('client'),
    'process.browser': true,
    'process.server': false
  })));

  // Build progress bar
  config.plugins.push(new ProgressBarPlugin());

  // --------------------------------------
  // Dev specific config
  // --------------------------------------
  if (this.options.dev) {
    // Add friendly error plugin
    config.plugins.push(new FriendlyErrorsWebpackPlugin());

    // Add HMR support
    config.entry.app = ['webpack-hot-middleware/client?name=$client&reload=true', config.entry.app];
    config.output.filename = '[name].js';
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
  }

  // --------------------------------------
  // Production specific config
  // --------------------------------------
  if (!this.options.dev) {
    // Minify JS
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }));

    // Webpack Bundle Analyzer
    if (this.options.build.analyze) {
      config.plugins.push(new webpackBundleAnalyzer.BundleAnalyzerPlugin(Object.assign({}, this.options.build.analyze)));
    }
  }

  // Extend config
  if (typeof this.options.build.extend === 'function') {
    this.options.build.extend.call(this, config, {
      dev: this.options.dev,
      isClient: true
    });
  }

  return config;
}

/*
|--------------------------------------------------------------------------
| Webpack Server Config
|--------------------------------------------------------------------------
*/
function webpackServerConfig() {
  var config = webpackBaseConfig.call(this, { isServer: true });

  config.name = 'server';

  // env object defined in nuxt.config.js
  var env = {};
  _.each(this.options.env, function (value, key) {
    env['process.env.' + key] = typeof value === 'string' ? JSON.stringify(value) : value;
  });

  config = Object.assign(config, {
    target: 'node',
    node: false,
    devtool: 'source-map',
    entry: path.resolve(this.options.buildDir, 'server.js'),
    output: Object.assign({}, config.output, {
      filename: 'server-bundle.js',
      libraryTarget: 'commonjs2'
    }),
    performance: {
      hints: false
    },
    externals: [
    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    nodeExternals({
      // load non-javascript files with extensions, presumably via loaders
      whitelist: [/\.(?!(?:js|json)$).{1,5}$/i]
    })],
    plugins: (config.plugins || []).concat([new VueSSRServerPlugin({
      filename: 'server-bundle.json'
    }), new webpack.DefinePlugin(Object.assign(env, {
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV || (this.options.dev ? 'development' : 'production')),
      'process.env.VUE_ENV': JSON.stringify('server'),
      'process.browser': false,
      'process.server': true
    }))])
  });

  // --------------------------------------
  // Production specific config
  // --------------------------------------
  if (!this.options.dev) {}

  // Extend config
  if (typeof this.options.build.extend === 'function') {
    this.options.build.extend.call(this, config, {
      dev: this.options.dev,
      isServer: true
    });
  }

  return config;
}

var debug$3 = Debug('nuxt:build');
debug$3.color = 2; // Force green color

var glob = pify(Glob);

var Builder = function (_Tapable) {
  inherits(Builder, _Tapable);

  function Builder(nuxt) {
    classCallCheck(this, Builder);

    var _this = possibleConstructorReturn(this, (Builder.__proto__ || Object.getPrototypeOf(Builder)).call(this));

    _this.nuxt = nuxt;
    _this.options = nuxt.options;

    // Fields that set on build
    _this.compiler = null;
    _this.webpackDevMiddleware = null;
    _this.webpackHotMiddleware = null;

    // Mute stats on dev
    _this.webpackStats = _this.options.dev ? false : {
      chunks: false,
      children: false,
      modules: false,
      colors: true

      // Helper to resolve build paths
    };_this.relativeToBuild = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return relativeTo.apply(undefined, [_this.options.buildDir].concat(args));
    };

    _this._buildStatus = STATUS.INITIAL;
    return _this;
  }

  createClass(Builder, [{
    key: 'build',
    value: function () {
      var _ref = asyncToGenerator(index$1.mark(function _callee() {
        var _this2 = this;

        var dir;
        return index$1.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this._buildStatus === STATUS.BUILD_DONE && this.options.dev)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', this);

              case 2:
                if (!(this._buildStatus === STATUS.BUILDING)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', new Promise(function (resolve$$1) {
                  setTimeout(function () {
                    resolve$$1(_this2.build());
                  }, 1000);
                }));

              case 4:
                this._buildStatus = STATUS.BUILDING;

                // Wait for nuxt ready
                _context.next = 7;
                return this.nuxt.ready();

              case 7:
                _context.next = 9;
                return this.nuxt.applyPluginsAsync('build', this);

              case 9:

                // Check if pages dir exists and warn if not
                this._nuxtPages = typeof this.options.build.createRoutes !== 'function';

                if (!this._nuxtPages) {
                  _context.next = 18;
                  break;
                }

                if (fs$1__default.existsSync(path.join(this.options.srcDir, 'pages'))) {
                  _context.next = 18;
                  break;
                }

                dir = this.options.srcDir;

                if (!fs$1__default.existsSync(path.join(this.options.srcDir, '..', 'pages'))) {
                  _context.next = 17;
                  break;
                }

                throw new Error('No `pages` directory found in ' + dir + '. Did you mean to run `nuxt` in the parent (`../`) directory?');

              case 17:
                throw new Error('Couldn\'t find a `pages` directory in ' + dir + '. Please create one under the project root');

              case 18:

                debug$3('App root: ' + this.options.srcDir);
                debug$3('Generating ' + this.options.buildDir + ' files...');

                // Create .nuxt/, .nuxt/components and .nuxt/dist folders
                _context.next = 22;
                return fs$1.remove(r(this.options.buildDir));

              case 22:
                _context.next = 24;
                return fs$1.mkdirp(r(this.options.buildDir, 'components'));

              case 24:
                if (this.options.dev) {
                  _context.next = 27;
                  break;
                }

                _context.next = 27;
                return fs$1.mkdirp(r(this.options.buildDir, 'dist'));

              case 27:
                _context.next = 29;
                return this.generateRoutesAndFiles();

              case 29:
                _context.next = 31;
                return this.webpackBuild();

              case 31:
                _context.next = 33;
                return this.applyPluginsAsync('built', this);

              case 33:

                // Flag to set that building is done
                this._buildStatus = STATUS.BUILD_DONE;

                return _context.abrupt('return', this);

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build() {
        return _ref.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: 'generateRoutesAndFiles',
    value: function () {
      var _ref2 = asyncToGenerator(index$1.mark(function _callee3() {
        var _this3 = this;

        var templatesFiles, templateVars, layoutsFiles, files, customTemplateFiles;
        return index$1.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                debug$3('Generating files...');
                // -- Templates --
                templatesFiles = ['App.vue', 'client.js', 'index.js', 'middleware.js', 'router.js', 'server.js', 'utils.js', 'empty.js', 'components/nuxt-error.vue', 'components/nuxt-loading.vue', 'components/nuxt-child.js', 'components/nuxt-link.js', 'components/nuxt.vue', 'views/app.template.html', 'views/error.html'];
                templateVars = {
                  options: this.options,
                  uniqBy: ___default.uniqBy,
                  isDev: this.options.dev,
                  router: this.options.router,
                  env: this.options.env,
                  head: this.options.head,
                  middleware: fs$1__default.existsSync(path.join(this.options.srcDir, 'middleware')),
                  store: this.options.store,
                  css: this.options.css,
                  plugins: this.plugins,
                  appPath: './App.vue',
                  layouts: Object.assign({}, this.options.layouts),
                  loading: typeof this.options.loading === 'string' ? this.relativeToBuild(this.options.srcDir, this.options.loading) : this.options.loading,
                  transition: this.options.transition,
                  components: {
                    ErrorPage: this.options.ErrorPage ? this.relativeToBuild(this.options.ErrorPage) : null
                  }

                  // -- Layouts --
                };

                if (!fs$1__default.existsSync(path.resolve(this.options.srcDir, 'layouts'))) {
                  _context3.next = 9;
                  break;
                }

                _context3.next = 6;
                return glob('layouts/*.vue', { cwd: this.options.srcDir });

              case 6:
                layoutsFiles = _context3.sent;

                layoutsFiles.forEach(function (file) {
                  var name = file.split('/').slice(-1)[0].replace('.vue', '');
                  if (name === 'error') return;
                  templateVars.layouts[name] = _this3.relativeToBuild(_this3.options.srcDir, file);
                });
                if (layoutsFiles.indexOf('layouts/error.vue') !== -1 && !templateVars.components.ErrorPage) {
                  templateVars.components.ErrorPage = this.relativeToBuild(this.options.srcDir, 'layouts/error.vue');
                }

              case 9:
                if (templateVars.layouts.default) {
                  _context3.next = 14;
                  break;
                }

                _context3.next = 12;
                return fs$1.mkdirp(r(this.options.buildDir, 'layouts'));

              case 12:
                templatesFiles.push('layouts/default.vue');
                templateVars.layouts.default = './layouts/default.vue';

              case 14:

                // -- Routes --
                debug$3('Generating routes...');
                // If user defined a custom method to create routes

                if (!this._nuxtPages) {
                  _context3.next = 22;
                  break;
                }

                _context3.next = 18;
                return glob('pages/**/*.vue', { cwd: this.options.srcDir });

              case 18:
                files = _context3.sent;

                templateVars.router.routes = createRoutes(files, this.options.srcDir);
                _context3.next = 23;
                break;

              case 22:
                templateVars.router.routes = this.options.build.createRoutes(this.options.srcDir);

              case 23:
                _context3.next = 25;
                return this.applyPluginsAsync('extendRoutes', { routes: templateVars.router.routes, templateVars: templateVars, r: r });

              case 25:

                // router.extendRoutes method
                if (typeof this.options.router.extendRoutes === 'function') {
                  // let the user extend the routes
                  this.options.router.extendRoutes(templateVars.router.routes, r);
                }

                // -- Store --
                // Add store if needed
                if (this.options.store) {
                  templatesFiles.push('store.js');
                }

                // Resolve template files
                customTemplateFiles = this.options.build.templates.map(function (t) {
                  return t.dst || path.basename(t.src || t);
                });


                templatesFiles = templatesFiles.map(function (file) {
                  // Skip if custom file was already provided in build.templates[]
                  if (customTemplateFiles.indexOf(file) !== -1) {
                    return;
                  }
                  // Allow override templates using a file with same name in ${srcDir}/app
                  var customPath = r(_this3.options.srcDir, 'app', file);
                  var customFileExists = fs$1__default.existsSync(customPath);

                  return {
                    src: customFileExists ? customPath : r(_this3.options.nuxtAppDir, file),
                    dst: file,
                    custom: customFileExists
                  };
                }).filter(function (i) {
                  return !!i;
                });

                // -- Custom templates --
                // Add custom template files
                templatesFiles = templatesFiles.concat(this.options.build.templates.map(function (t) {
                  return Object.assign({
                    src: r(_this3.options.srcDir, t.src || t),
                    dst: t.dst || path.basename(t.src || t),
                    custom: true
                  }, t);
                }));

                _context3.next = 32;
                return this.applyPluginsAsync('generate', { builder: this, templatesFiles: templatesFiles, templateVars: templateVars });

              case 32:
                _context3.next = 34;
                return Promise.all(templatesFiles.map(function () {
                  var _ref3 = asyncToGenerator(index$1.mark(function _callee2(_ref4) {
                    var src = _ref4.src,
                        dst = _ref4.dst,
                        options = _ref4.options,
                        custom = _ref4.custom;
                    var fileContent, template, content, path$$1, dateFS;
                    return index$1.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            // Add template to watchers
                            _this3.options.build.watch.push(src);
                            // Render template to dst
                            _context2.next = 3;
                            return fs$1.readFile(src, 'utf8');

                          case 3:
                            fileContent = _context2.sent;
                            template = ___default.template(fileContent, {
                              imports: {
                                serialize: serialize,
                                hash: hash,
                                r: r,
                                wp: wp,
                                resolvePath: _this3.nuxt.resolvePath.bind(_this3.nuxt),
                                relativeToBuild: _this3.relativeToBuild
                              }
                            });
                            content = template(Object.assign({}, templateVars, {
                              options: options || {},
                              custom: custom,
                              src: src,
                              dst: dst
                            }));
                            path$$1 = r(_this3.options.buildDir, dst);
                            // Ensure parent dir exits

                            _context2.next = 9;
                            return fs$1.mkdirp(path.dirname(path$$1));

                          case 9:
                            _context2.next = 11;
                            return fs$1.writeFile(path$$1, content, 'utf8');

                          case 11:
                            // Fix webpack loop (https://github.com/webpack/watchpack/issues/25#issuecomment-287789288)
                            dateFS = Date.now() / 1000 - 1000;
                            return _context2.abrupt('return', fs$1.utimes(path$$1, dateFS, dateFS));

                          case 13:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this3);
                  }));

                  return function (_x) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 34:
                _context3.next = 36;
                return this.applyPluginsAsync('generated', this);

              case 36:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function generateRoutesAndFiles() {
        return _ref2.apply(this, arguments);
      }

      return generateRoutesAndFiles;
    }()
  }, {
    key: 'webpackBuild',
    value: function () {
      var _ref5 = asyncToGenerator(index$1.mark(function _callee5() {
        var _this4 = this;

        var compilersOptions, clientConfig, serverConfig, sharedFS, sharedCache;
        return index$1.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                debug$3('Building files...');
                compilersOptions = [];

                // Client

                clientConfig = webpackClientConfig.call(this);

                compilersOptions.push(clientConfig);

                // Server
                serverConfig = webpackServerConfig.call(this);

                if (this.options.build.ssr) {
                  compilersOptions.push(serverConfig);
                }

                // Alias plugins to their real path
                this.plugins.forEach(function (p) {
                  var src = _this4.relativeToBuild(p.src);

                  // Client config
                  if (!clientConfig.resolve.alias[p.name]) {
                    clientConfig.resolve.alias[p.name] = src;
                  }

                  // Server config
                  if (!serverConfig.resolve.alias[p.name]) {
                    // Alias to noop for ssr:false plugins
                    serverConfig.resolve.alias[p.name] = p.ssr ? src : './empty.js';
                  }
                });

                // Simulate webpack multi compiler interface
                // Separate compilers are simpler, safer and faster
                this.compiler = { compilers: [] };
                this.compiler.plugin = function () {
                  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                  }

                  _this4.compiler.compilers.forEach(function (compiler) {
                    compiler.plugin.apply(compiler, args);
                  });
                };

                // Initialize shared FS and Cache
                sharedFS = this.options.dev && new MFS();
                sharedCache = {};

                // Initialize compilers

                compilersOptions.forEach(function (compilersOption) {
                  var compiler = webpack(compilersOption);
                  if (sharedFS) {
                    compiler.outputFileSystem = sharedFS;
                  }
                  compiler.cache = sharedCache;
                  _this4.compiler.compilers.push(compiler);
                });

                // Access to compilers with name
                this.compiler.compilers.forEach(function (compiler) {
                  if (compiler.name) {
                    _this4.compiler[compiler.name] = compiler;
                  }
                });

                // Run after each compile
                this.compiler.plugin('done', function () {
                  var _ref6 = asyncToGenerator(index$1.mark(function _callee4(stats) {
                    return index$1.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!stats.hasErrors()) {
                              _context4.next = 2;
                              break;
                            }

                            return _context4.abrupt('return');

                          case 2:
                            // Reload renderer if available
                            if (_this4.nuxt.renderer) {
                              _this4.nuxt.renderer.loadResources(sharedFS || fs$1__default);
                            }

                            _context4.next = 5;
                            return _this4.applyPluginsAsync('done', { builder: _this4, stats: stats });

                          case 5:
                          case 'end':
                            return _context4.stop();
                        }
                      }
                    }, _callee4, _this4);
                  }));

                  return function (_x2) {
                    return _ref6.apply(this, arguments);
                  };
                }());

                // Add dev Stuff
                if (this.options.dev) {
                  this.webpackDev();
                }

                _context5.next = 17;
                return this.applyPluginsAsync('compile', { builder: this, compiler: this.compiler });

              case 17:
                _context5.next = 19;
                return parallel(this.compiler.compilers, function (compiler) {
                  return new Promise(function (resolve$$1, reject) {
                    if (_this4.options.dev) {
                      // --- Dev Build ---
                      if (compiler.options.name === 'client') {
                        // Client watch is started by dev-middleware
                        resolve$$1();
                      } else {
                        // Build and watch for changes
                        compiler.watch(_this4.options.watchers.webpack, function (err) {
                          /* istanbul ignore if */
                          if (err) {
                            return reject(err);
                          }
                          resolve$$1();
                        });
                      }
                    } else {
                      // --- Production Build ---
                      compiler.run(function (err, stats) {
                        /* istanbul ignore if */
                        if (err) {
                          return reject(err);
                        }
                        if (err) return console.error(err); // eslint-disable-line no-console
                        // Show build stats for production
                        console.log(stats.toString(_this4.webpackStats)); // eslint-disable-line no-console
                        /* istanbul ignore if */
                        if (stats.hasErrors()) {
                          return reject(new Error('Webpack build exited with errors'));
                        }
                        resolve$$1();
                      });
                    }
                  });
                });

              case 19:
                _context5.next = 21;
                return this.applyPluginsAsync('compiled', this);

              case 21:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function webpackBuild() {
        return _ref5.apply(this, arguments);
      }

      return webpackBuild;
    }()
  }, {
    key: 'webpackDev',
    value: function webpackDev() {
      var _this5 = this;

      debug$3('Adding webpack middleware...');

      // Create webpack dev middleware
      this.webpackDevMiddleware = pify(webpackDevMiddleware(this.compiler.client, Object.assign({
        publicPath: this.options.build.publicPath,
        stats: this.webpackStats,
        noInfo: true,
        quiet: true,
        watchOptions: this.options.watchers.webpack
      }, this.options.build.devMiddleware)));

      this.webpackHotMiddleware = pify(webpackHotMiddleware(this.compiler.client, Object.assign({
        log: false,
        heartbeat: 2500
      }, this.options.build.hotMiddleware)));

      // Inject to renderer instance
      if (this.nuxt.renderer) {
        this.nuxt.renderer.webpackDevMiddleware = this.webpackDevMiddleware;
        this.nuxt.renderer.webpackHotMiddleware = this.webpackHotMiddleware;
      }

      // Stop webpack middleware on nuxt.close()
      this.nuxt.plugin('close', function () {
        return new Promise(function (resolve$$1) {
          _this5.webpackDevMiddleware.close(function () {
            return resolve$$1();
          });
        });
      });

      // Start watching files
      this.watchFiles();
    }
  }, {
    key: 'watchFiles',
    value: function watchFiles() {
      var _this6 = this;

      var patterns = [r(this.options.srcDir, 'layouts'), r(this.options.srcDir, 'store'), r(this.options.srcDir, 'middleware'), r(this.options.srcDir, 'layouts/*.vue'), r(this.options.srcDir, 'layouts/**/*.vue')];
      if (this._nuxtPages) {
        patterns.push(r(this.options.srcDir, 'pages'));
        patterns.push(r(this.options.srcDir, 'pages/*.vue'));
        patterns.push(r(this.options.srcDir, 'pages/**/*.vue'));
      }
      var options = Object.assign({}, this.options.watchers.chokidar, {
        ignoreInitial: true
      });
      /* istanbul ignore next */
      var refreshFiles = ___default.debounce(function () {
        return _this6.generateRoutesAndFiles();
      }, 200);

      // Watch for src Files
      var filesWatcher = chokidar.watch(patterns, options).on('add', refreshFiles).on('unlink', refreshFiles);

      // Watch for custom provided files
      var customFilesWatcher = chokidar.watch(___default.uniq(this.options.build.watch), options).on('change', refreshFiles);

      // Stop watching on nuxt.close()
      this.nuxt.plugin('close', function () {
        filesWatcher.close();
        customFilesWatcher.close();
      });
    }
  }, {
    key: 'plugins',
    get: function get$$1() {
      var _this7 = this;

      return this.options.plugins.map(function (p, i) {
        if (typeof p === 'string') p = { src: p };
        p.src = _this7.nuxt.resolvePath(p.src);
        return { src: p.src, ssr: p.ssr !== false, name: 'plugin' + i };
      });
    }
  }]);
  return Builder;
}(Tapable);

var STATUS = {
  INITIAL: 1,
  BUILD_DONE: 2,
  BUILDING: 3
};

var debug$4 = Debug('nuxt:generate');

var Generator = function (_Tapable) {
  inherits(Generator, _Tapable);

  function Generator(nuxt, builder) {
    classCallCheck(this, Generator);

    var _this = possibleConstructorReturn(this, (Generator.__proto__ || Object.getPrototypeOf(Generator)).call(this));

    _this.nuxt = nuxt;
    _this.options = nuxt.options;
    _this.builder = builder;

    // Set variables
    _this.generateRoutes = path.resolve(_this.options.srcDir, 'static');
    _this.srcBuiltPath = path.resolve(_this.options.buildDir, 'dist');
    _this.distPath = path.resolve(_this.options.rootDir, _this.options.generate.dir);
    _this.distNuxtPath = path.join(_this.distPath, isUrl(_this.options.build.publicPath) ? '' : _this.options.build.publicPath);
    return _this;
  }

  createClass(Generator, [{
    key: 'generate',
    value: function () {
      var _ref = asyncToGenerator(index$1.mark(function _callee2() {
        var _this2 = this;

        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$build = _ref2.build,
            build = _ref2$build === undefined ? true : _ref2$build,
            _ref2$init = _ref2.init,
            init = _ref2$init === undefined ? true : _ref2$init;

        var s, errors, generateRoutes, routes, _loop, duration, report;

        return index$1.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                s = Date.now();
                errors = [];

                // Wait for nuxt be ready

                _context3.next = 4;
                return this.nuxt.ready();

              case 4:
                if (!(this.builder && build)) {
                  _context3.next = 7;
                  break;
                }

                _context3.next = 7;
                return this.builder.build();

              case 7:
                _context3.next = 9;
                return this.nuxt.applyPluginsAsync('generate', this);

              case 9:
                if (!init) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 12;
                return this.initDist();

              case 12:

                // Resolve config.generate.routes promises before generating the routes
                generateRoutes = [];

                if (!(this.options.router.mode !== 'hash')) {
                  _context3.next = 28;
                  break;
                }

                _context3.prev = 14;

                console.log('Generating routes'); // eslint-disable-line no-console
                _context3.next = 18;
                return promisifyRoute(this.options.generate.routes || []);

              case 18:
                generateRoutes = _context3.sent;
                _context3.next = 21;
                return this.applyPluginsAsync('generateRoutes', { generator: this, generateRoutes: generateRoutes });

              case 21:
                _context3.next = 28;
                break;

              case 23:
                _context3.prev = 23;
                _context3.t0 = _context3['catch'](14);

                console.error('Could not resolve routes'); // eslint-disable-line no-console
                console.error(_context3.t0); // eslint-disable-line no-console
                throw _context3.t0;

              case 28:

                // Generate only index.html for router.mode = 'hash'
                routes = this.options.router.mode === 'hash' ? ['/'] : flatRoutes(this.options.router.routes);

                routes = this.decorateWithPayloads(routes, generateRoutes);

                _context3.next = 32;
                return this.applyPluginsAsync('generate', { generator: this, routes: routes });

              case 32:
                _loop = index$1.mark(function _loop() {
                  var n;
                  return index$1.wrap(function _loop$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          n = 0;
                          _context2.next = 3;
                          return Promise.all(routes.splice(0, _this2.options.generate.concurrency).map(function () {
                            var _ref4 = asyncToGenerator(index$1.mark(function _callee(_ref5) {
                              var route = _ref5.route,
                                  payload = _ref5.payload;
                              return index$1.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      _context.next = 2;
                                      return waitFor(n++ * _this2.options.generate.interval);

                                    case 2:
                                      _context.next = 4;
                                      return _this2.generateRoute({ route: route, payload: payload, errors: errors });

                                    case 4:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee, _this2);
                            }));

                            return function (_x2) {
                              return _ref4.apply(this, arguments);
                            };
                          }()));

                        case 3:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _loop, _this2);
                });

              case 33:
                if (!routes.length) {
                  _context3.next = 37;
                  break;
                }

                return _context3.delegateYield(_loop(), 't1', 35);

              case 35:
                _context3.next = 33;
                break;

              case 37:
                duration = Math.round((Date.now() - s) / 100) / 10;

                debug$4('HTML Files generated in ' + duration + 's');

                if (errors.length) {
                  report = errors.map(function (_ref3) {
                    var type = _ref3.type,
                        route = _ref3.route,
                        error = _ref3.error;

                    /* istanbul ignore if */
                    if (type === 'unhandled') {
                      return 'Route: \'' + route + '\'\n' + error.stack;
                    } else {
                      return 'Route: \'' + route + '\' thrown an error: \n' + JSON.stringify(error);
                    }
                  });

                  console.error('==== Error report ==== \n' + report.join('\n\n')); // eslint-disable-line no-console
                }

                _context3.next = 42;
                return this.applyPluginsAsync('generated', this);

              case 42:
                return _context3.abrupt('return', { duration: duration, errors: errors });

              case 43:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee2, this, [[14, 23]]);
      }));

      function generate() {
        return _ref.apply(this, arguments);
      }

      return generate;
    }()
  }, {
    key: 'initDist',
    value: function () {
      var _ref6 = asyncToGenerator(index$1.mark(function _callee3() {
        var nojekyllPath;
        return index$1.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return fs$1.remove(this.distPath);

              case 2:
                debug$4('Destination folder cleaned');

                // Copy static and built files
                /* istanbul ignore if */

                if (!fs__default.existsSync(this.generateRoutes)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 6;
                return fs$1.copy(this.generateRoutes, this.distPath);

              case 6:
                _context4.next = 8;
                return fs$1.copy(this.srcBuiltPath, this.distNuxtPath);

              case 8:

                // Add .nojekyll file to let Github Pages add the _nuxt/ folder
                // https://help.github.com/articles/files-that-start-with-an-underscore-are-missing/
                nojekyllPath = path.resolve(this.distPath, '.nojekyll');

                fs$1.writeFile(nojekyllPath, '');

                debug$4('Static & build files copied');

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function initDist() {
        return _ref6.apply(this, arguments);
      }

      return initDist;
    }()
  }, {
    key: 'decorateWithPayloads',
    value: function decorateWithPayloads(routes, generateRoutes) {
      var routeMap = {};
      // Fill routeMap for known routes
      routes.forEach(function (route) {
        routeMap[route] = {
          route: route,
          payload: null
        };
      });
      // Fill routeMap with given generate.routes
      generateRoutes.forEach(function (route) {
        // route is either a string or like {route : "/my_route/1"}
        var path$$1 = ___default.isString(route) ? route : route.route;
        routeMap[path$$1] = {
          route: path$$1,
          payload: route.payload || null
        };
      });
      return ___default.values(routeMap);
    }
  }, {
    key: 'generateRoute',
    value: function () {
      var _ref7 = asyncToGenerator(index$1.mark(function _callee4(_ref8) {
        var route = _ref8.route,
            _ref8$payload = _ref8.payload,
            payload = _ref8$payload === undefined ? {} : _ref8$payload,
            _ref8$errors = _ref8.errors,
            errors = _ref8$errors === undefined ? [] : _ref8$errors;
        var html, res, minifyErr, path$$1;
        return index$1.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                html = void 0;
                _context5.prev = 1;
                _context5.next = 4;
                return this.nuxt.renderer.renderRoute(route, { _generate: true, payload: payload });

              case 4:
                res = _context5.sent;

                html = res.html;
                if (res.error) {
                  errors.push({ type: 'handled', route: route, error: res.error });
                }
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5['catch'](1);
                return _context5.abrupt('return', errors.push({ type: 'unhandled', route: route, error: _context5.t0 }));

              case 12:

                if (this.options.generate.minify) {
                  try {
                    html = htmlMinifier.minify(html, this.options.generate.minify);
                  } catch (err) /* istanbul ignore next */{
                    minifyErr = new Error('HTML minification failed. Make sure the route generates valid HTML. Failed HTML:\n ' + html);

                    errors.push({ type: 'unhandled', route: route, error: minifyErr });
                  }
                }

                path$$1 = path.join(route, path.sep, 'index.html'); // /about -> /about/index.html

                path$$1 = path$$1 === '/404/index.html' ? '/404.html' : path$$1; // /404 -> /404.html
                debug$4('Generate file: ' + path$$1);
                path$$1 = path.join(this.distPath, path$$1);

                // Make sure the sub folders are created
                _context5.next = 19;
                return fs$1.mkdirp(path.dirname(path$$1));

              case 19:
                _context5.next = 21;
                return fs$1.writeFile(path$$1, html, 'utf8');

              case 21:
                return _context5.abrupt('return', true);

              case 22:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee4, this, [[1, 9]]);
      }));

      function generateRoute(_x3) {
        return _ref7.apply(this, arguments);
      }

      return generateRoute;
    }()
  }]);
  return Generator;
}(Tapable);

var builder = {
  Builder: Builder,
  Generator: Generator
};

var index = Object.assign({}, core, builder);

module.exports = index;
//# sourceMappingURL=nuxt.js.map
