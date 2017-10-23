/*!
 * Nuxt.js v1.0.0-rc11
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var path__default = _interopDefault(path);
var _ = require('lodash');
var ___default = _interopDefault(_);
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
var fs$1 = _interopDefault(require('fs-extra'));
var VueServerRenderer = require('vue-server-renderer');
var VueServerRenderer__default = _interopDefault(VueServerRenderer);
var Youch = _interopDefault(require('@nuxtjs/youch'));
var sourceMap = require('source-map');
var connect = _interopDefault(require('connect'));
var Vue = _interopDefault(require('vue'));
var VueMeta = _interopDefault(require('vue-meta'));
var LRU = _interopDefault(require('lru-cache'));
var enableDestroy = _interopDefault(require('server-destroy'));
var Module = _interopDefault(require('module'));

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
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);
});

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

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

var regenerator = runtimeModule;

var babelHelpers = {};
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve$$1, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve$$1,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();



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

babelHelpers;

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
  var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(ms) {
    return regenerator.wrap(function _callee$(_context) {
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
    if (typeof base !== 'function') {
      return fn.apply(this, arguments);
    }
    var baseResult = base.apply(this, arguments);
    // Allow function to mutate the first argument instead of returning the result
    if (baseResult === undefined) {
      baseResult = arguments[0];
    }
    var fnResult = fn.call.apply(fn, [this, baseResult].concat(toConsumableArray(Array.prototype.slice.call(arguments, 1))));
    // Return mutated argument if no result was returned
    if (fnResult === undefined) {
      return baseResult;
    }
    return fnResult;
  };
}

function isPureObject(o) {
  return !Array.isArray(o) && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
}

var isWindows = /^win/.test(process.platform);

function wp() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /* istanbul ignore if */
  if (isWindows) {
    return p.replace(/\\/g, '\\\\');
  }
  return p;
}

function wChunk() {
  var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  /* istanbul ignore if */
  if (isWindows) {
    return p.replace(/\//g, '\\\\');
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
      route.chunkName = file.replace(/\.vue$/, '');
      var child = ___default.find(parent, { name: route.name });
      if (child) {
        child.children = child.children || [];
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
      var i = 0;
      var res = 0;
      var y = 0;
      var z = 0;
      var _a = a.path.split('/');
      var _b = b.path.split('/');
      for (i = 0; i < _a.length; i++) {
        if (res !== 0) {
          break;
        }
        y = _a[i] === '*' ? 2 : _a[i].indexOf(':') > -1 ? 1 : 0;
        z = _b[i] === '*' ? 2 : _b[i].indexOf(':') > -1 ? 1 : 0;
        res = y - z;
        // If a.length >= b.length
        if (i === _b.length - 1 && res === 0) {
          // change order if * found
          res = _a[i] === '*' ? -1 : 1;
        }
      }
      return res === 0 ? _a[i - 1] === '*' && _b[i] ? 1 : -1 : res;
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
	isPureObject: isPureObject,
	isWindows: isWindows,
	wp: wp,
	wChunk: wChunk,
	r: r,
	relativeTo: relativeTo,
	flatRoutes: flatRoutes,
	cleanChildrenRoutes: cleanChildrenRoutes,
	createRoutes: createRoutes
});

var Options = {};

Options.from = function (_options) {
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
  ___default.defaultsDeep(options, Options.defaults);

  // Resolve dirs
  var hasValue = function hasValue(v) {
    return typeof v === 'string' && v;
  };
  options.rootDir = hasValue(options.rootDir) ? options.rootDir : process.cwd();
  options.srcDir = hasValue(options.srcDir) ? path.resolve(options.rootDir, options.srcDir) : options.rootDir;
  options.modulesDir = path.resolve(options.rootDir, hasValue(options.modulesDir) ? options.modulesDir : 'node_modules');
  options.buildDir = path.resolve(options.rootDir, options.buildDir);
  options.cacheDir = path.resolve(options.rootDir, options.cacheDir);

  // If app.html is defined, set the template path to the user template
  options.appTemplatePath = path.resolve(options.buildDir, 'views/app.template.html');
  if (fs.existsSync(path.join(options.srcDir, 'app.html'))) {
    options.appTemplatePath = path.join(options.srcDir, 'app.html');
  }

  // Ignore publicPath on dev
  /* istanbul ignore if */
  if (options.dev && isUrl(options.build.publicPath)) {
    options.build.publicPath = Options.defaults.build.publicPath;
  }

  // If store defined, update store options to true unless explicitly disabled
  if (options.store !== false && fs.existsSync(path.join(options.srcDir, 'store'))) {
    options.store = true;
  }

  // Normalize loadingIndicator
  if (!isPureObject(options.loadingIndicator)) {
    options.loadingIndicator = { name: options.loadingIndicator };
  }

  // Apply defaults to loadingIndicator
  options.loadingIndicator = Object.assign({
    name: 'pulse',
    color: '#dbe1ec',
    background: 'white'
  }, options.loadingIndicator);

  // cssSourceMap
  if (options.build.cssSourceMap === undefined) {
    options.build.cssSourceMap = options.dev;
  }

  // Postcss
  // 1. Check if it is explicitly disabled by false value
  // ... Disable all postcss loaders
  // 2. Check if any standard source of postcss config exists
  // ... Make postcss = true letting loaders find this kind of config
  // 3. Else (Easy Usage)
  // ... Auto merge it with defaults
  if (options.build.postcss !== false) {
    // Detect postcss config existence
    // https://github.com/michael-ciniawsky/postcss-load-config
    var postcssConfigExists = false;
    var _arr = [options.srcDir, options.rootDir];
    for (var _i = 0; _i < _arr.length; _i++) {
      var dir = _arr[_i];var _arr2 = ['postcss.config.js', '.postcssrc.js', '.postcssrc', '.postcssrc.json', '.postcssrc.yaml'];

      for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var file = _arr2[_i2];
        if (fs.existsSync(path.resolve(dir, file))) {
          postcssConfigExists = true;
          break;
        }
      }
      if (postcssConfigExists) break;
    }

    // Default postcss options
    if (postcssConfigExists) {
      options.build.postcss = true;
    }

    // Normalize & Apply default plugins
    if (Array.isArray(options.build.postcss)) {
      options.build.postcss = { plugins: options.build.postcss };
    }
    if (isPureObject(options.build.postcss)) {
      options.build.postcss = Object.assign({
        sourceMap: options.build.cssSourceMap,
        plugins: {
          // https://github.com/postcss/postcss-import
          'postcss-import': {
            root: options.rootDir,
            path: [options.srcDir, options.rootDir, options.modulesDir]
          },
          // https://github.com/postcss/postcss-url
          'postcss-url': {},
          // http://cssnext.io/postcss
          'postcss-cssnext': {}
        }
      }, options.build.postcss);
    }
  }

  // Debug errors
  if (options.debug === undefined) {
    options.debug = options.dev;
  }

  // Apply mode preset
  var modePreset = Options.modes[options.mode || 'universal'] || Options.modes['universal'];
  ___default.defaultsDeep(options, modePreset);

  // If no server-side rendering, add appear true transition
  if (options.render.ssr === false) {
    options.transition.appear = true;
  }

  return options;
};

Options.modes = {
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
  }
};

Options.defaults = {
  mode: 'universal',
  dev: process.env.NODE_ENV !== 'production',
  debug: undefined, // Will be equal to dev if not provided
  buildDir: '.nuxt',
  cacheDir: '.cache',
  nuxtAppDir: path.resolve(__dirname, '../lib/app/'), // Relative to dist
  build: {
    analyze: false,
    dll: false,
    extractCSS: false,
    cssSourceMap: undefined,
    ssr: undefined,
    publicPath: '/_nuxt/',
    filenames: {
      css: 'common.[contenthash].css',
      manifest: 'manifest.[hash].js',
      vendor: 'common.[chunkhash].js',
      app: 'app.[chunkhash].js',
      chunk: '[name].[chunkhash].js'
    },
    vendor: [],
    plugins: [],
    babel: {},
    postcss: {},
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
      sortClassName: false,
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
    duration: 5000,
    rtl: false
  },
  loadingIndicator: {},
  transition: {
    name: 'page',
    mode: 'out-in',
    appear: false,
    appearClass: 'appear',
    appearActiveClass: 'appear-active',
    appearToClass: 'appear-to'
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
    webpack: {
      ignored: /-dll/
    },
    chokidar: {}
  },
  messages: {
    error_404: 'This page could not be found',
    server_error: 'Server error',
    nuxtjs: 'Nuxt.js',
    back_to_home: 'Back to the home page',
    server_error_details: 'An error occurred in the application and your page could not be served. If you are the application owner, check your logs for details.',
    client_error: 'Error',
    client_error_details: 'An error occurred while rendering the page. Check developer tools console for details.'
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
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return sequence(this.options.modules, this.addModule.bind(this));

              case 2:
                _context.next = 4;
                return this.applyPluginsAsync('ready', this);

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
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(moduleOpts, requireOnce) {
        var _this2 = this;

        var options, originalSrc, module, alreadyRequired;
        return regenerator.wrap(function _callee2$(_context2) {
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

var MetaRenderer = function () {
  function MetaRenderer(nuxt, renderer) {
    classCallCheck(this, MetaRenderer);

    this.nuxt = nuxt;
    this.renderer = renderer;
    this.options = nuxt.options;
    this.vueRenderer = VueServerRenderer__default.createRenderer();
    this.cache = LRU({});

    // Add VueMeta to Vue (this is only for SPA mode)
    // See lib/app/index.js
    Vue.use(VueMeta, {
      keyName: 'head',
      attribute: 'data-n-head',
      ssrAttribute: 'data-n-head-ssr',
      tagIDKeyName: 'hid'
    });
  }

  createClass(MetaRenderer, [{
    key: 'getMeta',
    value: function getMeta(url) {
      var _this = this;

      return new Promise(function (resolve$$1, reject) {
        var vm = new Vue({
          render: function render(h) {
            return h();
          }, // Render empty html tag
          head: _this.options.head || {}
        });
        _this.vueRenderer.renderToString(vm, function (err) {
          if (err) return reject(err);
          resolve$$1(vm.$meta().inject());
        });
      });
    }
  }, {
    key: 'render',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref2) {
        var _ref2$url = _ref2.url,
            url = _ref2$url === undefined ? '/' : _ref2$url;
        var meta, m, clientManifest, publicPath;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                meta = this.cache.get(url);

                if (!meta) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', meta);

              case 3:

                meta = {
                  HTML_ATTRS: '',
                  BODY_ATTRS: '',
                  HEAD: ''
                  // Get vue-meta context
                };_context.next = 6;
                return this.getMeta(url);

              case 6:
                m = _context.sent;

                // HTML_ATTRS
                meta.HTML_ATTRS = m.htmlAttrs.text();
                // BODY_ATTRS
                meta.BODY_ATTRS = m.bodyAttrs.text();
                // HEAD tags
                meta.HEAD = m.meta.text() + m.title.text() + m.link.text() + m.style.text() + m.script.text() + m.noscript.text();
                // Resources Hints
                meta.resourceHints = '';
                // Resource Hints
                clientManifest = this.renderer.resources.clientManifest;

                if (this.options.render.resourceHints && clientManifest) {
                  publicPath = clientManifest.publicPath || '/_nuxt/';
                  // Pre-Load initial resources

                  if (Array.isArray(clientManifest.initial)) {
                    meta.resourceHints += clientManifest.initial.map(function (r) {
                      return '<link rel="preload" href="' + publicPath + r + '" as="script" />';
                    }).join('');
                  }
                  // Pre-Fetch async resources
                  if (Array.isArray(clientManifest.async)) {
                    meta.resourceHints += clientManifest.async.map(function (r) {
                      return '<link rel="prefetch" href="' + publicPath + r + '" />';
                    }).join('');
                  }
                  // Add them to HEAD
                  if (meta.resourceHints) {
                    meta.HEAD += meta.resourceHints;
                  }
                }

                // Set meta tags inside cache
                this.cache.set(url, meta);

                return _context.abrupt('return', meta);

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render(_x) {
        return _ref.apply(this, arguments);
      }

      return render;
    }()
  }]);
  return MetaRenderer;
}();

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
    _this.metaRenderer = null;

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
      errorTemplate: parseTemplate('Nuxt.js Internal Server Error')
    };
    return _this;
  }

  createClass(Renderer, [{
    key: '_ready',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.nuxt.applyPluginsAsync('renderer', this);

              case 2:
                _context.next = 4;
                return this.setupMiddleware();

              case 4:
                if (this.options.dev) {
                  _context.next = 7;
                  break;
                }

                _context.next = 7;
                return this.loadResources();

              case 7:
                _context.next = 9;
                return this.applyPluginsAsync('ready', this);

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
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
        var _this2 = this;

        var _fs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fs$1;

        var distPath, updated, errorTemplatePath, loadingHTMLPath;
        return regenerator.wrap(function _callee2$(_context2) {
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

                // Reload error template
                errorTemplatePath = path.resolve(this.options.buildDir, 'views/error.html');

                if (fs$1.existsSync(errorTemplatePath)) {
                  this.resources.errorTemplate = parseTemplate(fs$1.readFileSync(errorTemplatePath, 'utf8'));
                }

                // Load loading template
                loadingHTMLPath = path.resolve(this.options.buildDir, 'loading.html');

                if (fs$1.existsSync(loadingHTMLPath)) {
                  this.resources.loadingHTML = fs$1.readFileSync(loadingHTMLPath, 'utf8');
                  this.resources.loadingHTML = this.resources.loadingHTML.replace(/[\r|\n]/g, '');
                } else {
                  this.resources.loadingHTML = '';
                }

                // Call resourcesLoaded plugin
                _context2.next = 9;
                return this.applyPluginsAsync('resourcesLoaded', this.resources);

              case 9:

                if (updated.length > 0) {
                  // debug('Updated', updated.join(', '), isServer)
                  this.createRenderer();
                }

              case 10:
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
      // Ensure resources are available
      if (!this.isResourcesAvailable) {
        return;
      }

      // Create Meta Renderer
      this.metaRenderer = new MetaRenderer(this.nuxt, this);

      // Show Open URL
      this.nuxt.showOpen();

      // Skip following steps if noSSR mode
      if (this.noSSR) {
        return;
      }

      // Create bundle renderer for SSR
      this.bundleRenderer = VueServerRenderer.createBundleRenderer(this.resources.serverBundle, Object.assign({
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
      var $m = m;
      var src = void 0;
      if (typeof m === 'string') {
        src = this.nuxt.resolvePath(m);
        m = require(src);
      }
      if (typeof m.handler === 'string') {
        src = this.nuxt.resolvePath(m.handler);
        m.handler = require(src);
      }

      var handler = m.handler || m;
      var path$$1 = ((m.prefix !== false ? this.options.router.base : '') + (m.path ? m.path : '')).replace(/\/\//g, '/');

      // Inject $src and $m to final handler
      if (src) handler.$src = src;
      handler.$m = $m;

      // Use middleware
      this.app.use(path$$1, handler);
    }
  }, {
    key: 'setupMiddleware',
    value: function () {
      var _ref4 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        var _this3 = this;

        var distDir;
        return regenerator.wrap(function _callee4$(_context4) {
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
                    var _ref5 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(req, res, next) {
                      return regenerator.wrap(function _callee3$(_context3) {
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
                    path: this.publicPath,
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
                this.useMiddleware(this.nuxtMiddleware.bind(this));

                // Error middleware for errors that occurred in middleware that declared above
                // Middleware should exactly take 4 arguments
                // https://github.com/senchalabs/connect#error-middleware
                this.useMiddleware(this.errorMiddleware.bind(this));

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
      var _ref6 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(req, res, next) {
        var context, _ref7, html, error, redirected, resourceHints, etag, regex, pushAssets, m, _m, _m2, _2, rel, href, as;

        return regenerator.wrap(function _callee5$(_context5) {
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

                if (!(context && context.redirected)) {
                  _context5.next = 32;
                  break;
                }

                console.error(_context5.t0); // eslint-disable-line no-console
                return _context5.abrupt('return', _context5.t0);

              case 32:

                next(_context5.t0);

              case 33:
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
    value: function errorMiddleware(err, req, res, next) {
      // ensure statusCode, message and name fields
      err.statusCode = err.statusCode || 500;
      err.message = err.message || 'Nuxt Server Error';
      err.name = !err.name || err.name === 'Error' ? 'NuxtServerError' : err.name;

      var sendResponse = function sendResponse(content) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/html';

        // Set Headers
        res.statusCode = err.statusCode;
        res.statusMessage = err.name;
        res.setHeader('Content-Type', type + '; charset=utf-8');
        res.setHeader('Content-Length', Buffer.byteLength(content));

        // Send Response
        res.end(content, 'utf-8');
      };

      // Check if request accepts JSON
      var hasReqHeader = function hasReqHeader(header, includes) {
        return req.headers[header] && req.headers[header].toLowerCase().indexOf(includes) !== -1;
      };
      var isJson = hasReqHeader('accept', 'application/json') || hasReqHeader('user-agent', 'curl/');

      // Use basic errors when debug mode is disabled
      if (!this.options.debug) {
        // Json format is compatible with Youch json responses
        var json = {
          status: err.statusCode,
          message: err.message,
          name: err.name
        };
        if (isJson) {
          sendResponse(JSON.stringify(json, undefined, 2), 'text/json');
          return;
        }
        var html = this.resources.errorTemplate(json);
        sendResponse(html);
        return;
      }

      // Show stack trace
      var youch = new Youch(err, req, this.readSource.bind(this));
      if (isJson) {
        youch.toJSON().then(function (json) {
          sendResponse(JSON.stringify(json, undefined, 2), 'text/json');
        });
      } else {
        youch.toHTML().then(function (html) {
          sendResponse(html);
        });
      }
    }
  }, {
    key: 'readSource',
    value: function () {
      var _ref8 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(frame) {
        var serverBundle, sanitizeName, smc, _smc$originalPosition, line, column, name, source, contents, searchPath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pathDir, fullPath, _source;

        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                serverBundle = this.resources.serverBundle;

                // Remove webpack:/// & query string from the end

                sanitizeName = function sanitizeName(name) {
                  return name ? name.replace('webpack:///', '').split('?')[0] : '';
                };

                // SourceMap Support for SSR Bundle


                if (!(serverBundle && serverBundle.maps[frame.fileName])) {
                  _context6.next = 16;
                  break;
                }

                // Initialize smc cache
                if (!serverBundle.$maps) {
                  serverBundle.$maps = {};
                }

                // Read SourceMap object
                smc = serverBundle.$maps[frame.fileName] || new sourceMap.SourceMapConsumer(serverBundle.maps[frame.fileName]);

                serverBundle.$maps[frame.fileName] = smc;

                // Try to find original position
                _smc$originalPosition = smc.originalPositionFor({
                  line: frame.getLineNumber() || 0,
                  column: frame.getColumnNumber() || 0
                }), line = _smc$originalPosition.line, column = _smc$originalPosition.column, name = _smc$originalPosition.name, source = _smc$originalPosition.source;

                if (line) {
                  frame.lineNumber = line;
                }
                if (column) {
                  frame.columnNumber = column;
                }
                if (name) {
                  frame.functionName = name;
                }

                if (!source) {
                  _context6.next = 16;
                  break;
                }

                frame.fileName = sanitizeName(source);

                // Source detected, try to get original source code
                contents = smc.sourceContentFor(source);

                if (!contents) {
                  _context6.next = 16;
                  break;
                }

                frame.contents = contents;
                return _context6.abrupt('return');

              case 16:
                if (frame.fileName) {
                  _context6.next = 18;
                  break;
                }

                return _context6.abrupt('return');

              case 18:

                frame.fileName = sanitizeName(frame.fileName);

                // Try to read from SSR bundle files

                if (!(serverBundle && serverBundle.files[frame.fileName])) {
                  _context6.next = 22;
                  break;
                }

                frame.contents = serverBundle.files[frame.fileName];
                return _context6.abrupt('return');

              case 22:

                // Possible paths for file
                searchPath = [this.options.rootDir, path.join(this.options.buildDir, 'dist'), this.options.srcDir, this.options.buildDir];

                // Scan filesystem

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context6.prev = 26;
                _iterator = searchPath[Symbol.iterator]();

              case 28:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context6.next = 40;
                  break;
                }

                pathDir = _step.value;
                fullPath = path.resolve(pathDir, frame.fileName);
                _context6.next = 33;
                return fs$1.readFile(fullPath, 'utf-8').catch(function () {
                  return null;
                });

              case 33:
                _source = _context6.sent;

                if (!_source) {
                  _context6.next = 37;
                  break;
                }

                frame.contents = _source;
                return _context6.abrupt('return');

              case 37:
                _iteratorNormalCompletion = true;
                _context6.next = 28;
                break;

              case 40:
                _context6.next = 46;
                break;

              case 42:
                _context6.prev = 42;
                _context6.t0 = _context6['catch'](26);
                _didIteratorError = true;
                _iteratorError = _context6.t0;

              case 46:
                _context6.prev = 46;
                _context6.prev = 47;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 49:
                _context6.prev = 49;

                if (!_didIteratorError) {
                  _context6.next = 52;
                  break;
                }

                throw _iteratorError;

              case 52:
                return _context6.finish(49);

              case 53:
                return _context6.finish(46);

              case 54:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this, [[26, 42, 46, 54], [47,, 49, 53]]);
      }));

      function readSource(_x9) {
        return _ref8.apply(this, arguments);
      }

      return readSource;
    }()
  }, {
    key: 'renderRoute',
    value: function () {
      var _ref9 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(url) {
        var _this4 = this;

        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var spa, _ref10, HTML_ATTRS, BODY_ATTRS, _HEAD, _resourceHints, _APP, err, data, _html, APP, m, HEAD, resourceHints, html;

        return regenerator.wrap(function _callee7$(_context7) {
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

                // Basic response if SSR is disabled or spa data provided
                spa = context.spa || context.res && context.res.spa;

                if (!(this.noSSR || spa)) {
                  _context7.next = 21;
                  break;
                }

                _context7.next = 9;
                return this.metaRenderer.render(context);

              case 9:
                _ref10 = _context7.sent;
                HTML_ATTRS = _ref10.HTML_ATTRS;
                BODY_ATTRS = _ref10.BODY_ATTRS;
                _HEAD = _ref10.HEAD;
                _resourceHints = _ref10.resourceHints;
                _APP = '<div id="__nuxt">' + this.resources.loadingHTML + '</div>';

                // Detect 404 errors

                if (!(url.indexOf(this.options.build.publicPath) !== -1 || url.indexOf('__webpack') !== -1)) {
                  _context7.next = 18;
                  break;
                }

                err = { statusCode: 404, message: this.options.messages.error_404, name: 'ResourceNotFound' };
                throw err;

              case 18:
                data = {
                  HTML_ATTRS: HTML_ATTRS,
                  BODY_ATTRS: BODY_ATTRS,
                  HEAD: _HEAD,
                  APP: _APP
                };
                _html = this.resources.spaTemplate(data);
                return _context7.abrupt('return', { html: _html, resourceHints: _resourceHints });

              case 21:
                _context7.next = 23;
                return this.bundleRenderer.renderToString(context);

              case 23:
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


                if (this.options.render.resourceHints) {
                  resourceHints = context.renderResourceHints();
                  HEAD += resourceHints;
                }
                APP += '<script type="text/javascript">window.__NUXT__=' + serialize(context.nuxt, { isJSON: true }) + ';</script>';
                APP += context.renderScripts();

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

              case 35:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function renderRoute(_x10) {
        return _ref9.apply(this, arguments);
      }

      return renderRoute;
    }()
  }, {
    key: 'renderAndGetWindow',
    value: function () {
      var _ref11 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(url) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var options, _ref12, window, nuxtExists, error;

        return regenerator.wrap(function _callee8$(_context8) {
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
                _ref12 = _context8.sent;
                window = _ref12.window;

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

      function renderAndGetWindow(_x12) {
        return _ref11.apply(this, arguments);
      }

      return renderAndGetWindow;
    }()
  }, {
    key: 'noSSR',
    get: function get$$1() {
      return this.options.render.ssr === false;
    }
  }, {
    key: 'isReady',
    get: function get$$1() {
      if (this.noSSR) {
        return Boolean(this.resources.spaTemplate);
      }

      return Boolean(this.bundleRenderer && this.resources.ssrTemplate);
    }
  }, {
    key: 'isResourcesAvailable',
    get: function get$$1() {
      // Required for both
      if (!this.resources.clientManifest) {
        return false;
      }

      // Required for SPA rendering
      if (this.noSSR) {
        return Boolean(this.resources.spaTemplate);
      }

      // Required for bundle renderer
      return Boolean(this.resources.ssrTemplate && this.resources.serverBundle);
    }
  }, {
    key: 'publicPath',
    get: function get$$1() {
      return isUrl(this.options.build.publicPath) ? Options.defaults.build.publicPath : this.options.build.publicPath;
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

    _this.options = Options.from(_options);

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

    // Default Show Open if Nuxt is not listening
    _this.showOpen = function () {};

    _this._ready = _this.ready().catch(_this.errorHandler);
    return _this;
  }

  createClass(Nuxt, [{
    key: 'ready',
    value: function () {
      var _ref = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
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

      // Update showOpen
      this.showOpen = function () {
        var _host = host === '0.0.0.0' ? 'localhost' : host;
        // eslint-disable-next-line no-console
        console.log('\n' + chalk.bgGreen.black(' OPEN ') + chalk.green(' http://' + _host + ':' + port + '\n'));
      };

      return new Promise(function (resolve$$1, reject) {
        var server = _this2.renderer.app.listen({ port: port, host: host, exclusive: false }, function (err) {
          /* istanbul ignore if */
          if (err) {
            return reject(err);
          }

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

          resolve$$1(_this2.applyPluginsAsync('listen', { server: server, port: port, host: host }));
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
      var _ref2 = asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(callback) {
        return regenerator.wrap(function _callee2$(_context2) {
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

exports.Nuxt = Nuxt;
exports.Module = ModuleContainer;
exports.Renderer = Renderer;
exports.Options = Options;
exports.Utils = Utils;
//# sourceMappingURL=core.js.map
