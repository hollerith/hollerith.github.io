(function ($root) {

    const Container = {
        inject: function ($host, data, namespace, replace) {
            let $node = null;
            let $replacement;
            if (replace && $host) {
                $replacement = Component.$type(data, namespace);
                if (data.hasOwnProperty('$app')) {
                    $node = $host;
                    if ($node.parentNode) $node.parentNode.replaceChild($replacement, $node);
                }
                $node = $replacement;
            } else if (data.$type && (data.$type === 'head' || data.$type === 'body') && $root.document.getElementsByTagName(data.$type)) {
                $node = $root.document.getElementsByTagName(data.$type)[0];
            } else if (data.id && $root.document.getElementById(data.id)) {
                $node = $root.document.getElementById(data.id);
                if ($node.nodeName.toLowerCase() !== (data.$type || 'div')) {
                    $replacement = Component.$type(data, namespace);
                    $node.parentNode.replaceChild($replacement, $node);
                    $node = $replacement;
                }
            }
            if ($node && !$node.Meta) $node.Meta = {};
            return $node;
        },
        add: function ($parent, data, index, namespace) {
            const $node = Component.$type(data, namespace);
            if (index !== null && index !== undefined && $parent.childNodes && $parent.childNodes[index]) {
                $parent.insertBefore($node, $parent.childNodes[index]);
            } else {
                $parent.appendChild($node);
            }
            return $node;
        },
        build: function ($parent, data, index, namespace, replace) {
            const $existing = Container.inject($parent, data, namespace, replace);
            if ($existing) return $existing;
            else return Container.add($parent, data, index, namespace);
        },
    };

    const Renderer = {
        set: function ($node, key, val) {
            if (['$init'].indexOf(key) === -1) {
                $node.Renderer[key] = Binder.bind($node, val);
            } else {
                val.snapshot = val;
                $node.Renderer[key] = val;
            }
        },
        update: function ($node, key, val) {
            Binder.queue($node, key, 'w');
            Renderer.set($node, key, val);
        },
        build: function ($node, data, inheritance) {
            $node.Renderer = {};
            $node.Inheritance = inheritance;
            for (const key in data) {
                Renderer.set($node, key, data[key]);
            }
        },
        insert: function (data) {
            const element = data.$element;
            if (!element) return data;
            const mutations = Array.isArray(element) ? element : [element];
            delete data.$element;
            return mutations.reduce(function (g, mutate) {
                const mutated = mutate(g);
                if (mutated === null || typeof mutated !== 'object') {
                    throw new Error('$element not an object');
                }
                mutated.$type = mutated.$type || 'div';
                return mutated;
            }, data);
        },
    };

    const Engine = {
        freeze: function (data) {
            let cache = [];
            const res = JSON.stringify(data, function (key, val) {
                if (typeof val === 'function') { return val.toString(); }
                if (typeof val === 'object' && val !== null) {
                    if (cache.indexOf(val) !== -1) { return '[Circular]'; }
                    cache.push(val);
                }
                return val;
            });
            cache = null;
            return res;
        },
        LCS: function (a, b) {
            const m = a.length, n = b.length;
            const C = Array.from({ length: m + 1 }, () => [0]);
            C[0] = Array.from({ length: n + 1 }, () => 0);

            const af = a.map(item => Engine.freeze(item));
            const bf = b.map(item => Engine.freeze(item));

            for (let i = 0; i < m; i++) {
                for (let j = 0; j < n; j++) {
                    C[i + 1][j + 1] = af[i] === bf[j] ? C[i][j] + 1 : Math.max(C[i + 1][j], C[i][j + 1]);
                }
            }

            return this.backtrack(C, af, bf, m, n);
        },
        backtrack: function (C, af, bf, m, n) {
            if (m === 0 || n === 0) return [];
            if (af[m - 1] === bf[n - 1]) {
                return this.backtrack(C, af, bf, m - 1, n - 1).concat({ item: af[m - 1], _old: m - 1, _new: n - 1 });
            }
            return C[m][n - 1] > C[m - 1][n] ? this.backtrack(C, af, bf, m, n - 1) : this.backtrack(C, af, bf, m - 1, n);
        },
        diff: function (_old, _new) {
            const lcs = this.LCS(_old, _new);
            const old_common = lcs.map(i => i._old);
            const new_common = lcs.map(i => i._new);

            const minus = _old.map((item, index) => ({ item, index }))
                .filter(({ index }) => !old_common.includes(index));

            const plus = _new.map((item, index) => ({ item, index }))
                .filter(({ index }) => !new_common.includes(index));

            return { '-': minus, '+': plus };
        },
    };

    const Component = {
        build: function ($node, renderer) {
            Component.$init($node);
            for (const key in renderer) {
                if (renderer[key] !== null && renderer[key] !== undefined) {
                    Component.set($node, key, renderer[key]);
                }
            }
        },
        multiline: (fn) => /\/\*!?(?:@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//.exec(fn.toString())[1],
        get: (key) => Object.getOwnPropertyDescriptor($root.HTMLElement.prototype, key) || Object.getOwnPropertyDescriptor($root.Element.prototype, key),
        set: function ($node, key, val) {
            if (key[0] === '$') {
                if (key === '$type') {
                    const tag = $node.tagName ? $node.tagName.toLowerCase() : 'text';
                    if (val.toLowerCase() !== tag) {
                        const fragment = Component.$type({ $type: 'fragment' });
                        const replacement = fragment.$build($node.Renderer, $node.Inheritance, null, $node.Meta.namespace);
                        $node.parentNode.replaceChild(replacement, $node);
                    }
                } else if (key === '$text') {
                    if (typeof val === 'function') val = Component.multiline(val);
                    $node.textContent = val;
                } else if (key === '$html') {
                    if (typeof val === 'function') val = Component.multiline(val);
                    $node.innerHTML = val;
                } else if (key === '$nodes') {
                    Component.$nodes($node, val);
                }
            } else if (key === 'value') {
                $node[key] = val;
            } else if (key === 'style' && typeof val === 'object') {
                const CSSStyleDeclaration = Component.get(key).get.call($node);
                for (const attr in val) { CSSStyleDeclaration[attr] = val[attr]; }
            } else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
                if ($node.setAttribute) $node.setAttribute(key, val);
            } else if (typeof val === 'function') {
                const prop = Component.get(key);
                if (prop) prop.set.call($node, val);
            }
        },
        $type: function (model, namespace) {
            const meta = {};
            let $node;
            if (model.$type === 'svg') {
                $node = $root.document.createElementNS('http://www.w3.org/2000/svg', model.$type);
                meta.namespace = $node.namespaceURI;
            } else if (namespace) {
                $node = $root.document.createElementNS(namespace, model.$type);
                meta.namespace = $node.namespaceURI;
            } else if (model.$type === 'fragment') {
                $node = $root.document.createDocumentFragment();
            } else if (model.$type === 'text') {
                if (model.$text && typeof model.$text === 'function') model.$text = Component.multiline(model.$text);
                $node = $root.document.createTextNode(model.$text);
            } else {
                $node = $root.document.createElement(model.$type || 'div');
            }
            $node.Meta = meta;
            return $node;
        },
        $nodes: function ($parent, components) {
            if (!components) components = [];
            const old = [].map.call($parent.childNodes, function ($node) {
                return $node.Renderer;
            }).filter(function (item) {
                return item;
            });
            if (old.length > 0) {
                const diff = Engine.diff(old, components);
                diff['-'].forEach(function (item) { $parent.childNodes[item.index].Kill = true; });
                [].filter.call($parent.childNodes, function ($node) {
                    return $node.Kill;
                }).forEach(function ($node) {
                    $parent.removeChild($node);
                });
                diff['+'].forEach(function (item) {
                    let inheritance = $parent.Inheritance;
                    for (const key in $parent.Renderer) {
                        if (key[0] === '_') inheritance = inheritance.concat([key]);
                    }
                    $parent.$build(item.item, inheritance, item.index, $parent.Meta.namespace);
                    $parent.$nodes[item.index] = $parent.childNodes[item.index].Renderer;
                });
            } else {
                const $fragment = Component.$type({ $type: 'fragment' });
                let inheritance = $parent.Inheritance;
                for (const key in $parent.Renderer) {
                    if (key[0] === '_') inheritance = inheritance.concat([key]);
                }
                while ($parent.firstChild) { $parent.removeChild($parent.firstChild); }
                components.forEach(function (component) {
                    $fragment.$build(component, inheritance, null, $parent.Meta.namespace);
                });
                $parent.appendChild($fragment);
                $parent.$nodes = [].map.call($parent.childNodes, function ($node) { return $node.Renderer; });
            }
        },
        $init: function ($node) {
            Binder.tick.call($root, function () {
                if ($node?.Renderer.$init) Binder.bind($node, $node.Renderer.$init)();
            });
        },
        $update: function ($node) {
            if ($node.parentNode && !$node.Meta.$updated && $node.$update) {
                $node.Meta.$updated = true;
                $node.$update();
                for (const key in $node.Dirty) { Component.set($node, key, $node.Renderer[key]); }
                $node.Meta.$updated = false;
                $node.Dirty = null;
            }
        },
    };

    const Binder = {
        tick: $root.requestAnimationFrame || $root.webkitRequestAnimationFrame || $root.mozRequestAnimationFrame || $root.msRequestAnimationFrame || function (cb) { return $root.setTimeout(cb, 1000 / 60); },
        set: function ($node, key) {
            try {
                Object.defineProperty($node, key, {
                    configurable: true,
                    get: function () {
                        let result = null;
                        if (key[0] === '$' || key[0] === '_') {
                            if (key in $node.Renderer) {
                                Binder.queue($node, key, 'r');
                                result = $node.Renderer[key];
                            } else if (key[0] === '_') {
                                let $current = $node;
                                while ($current = $current.parentNode) {
                                    if ($current?.Renderer && (key in $current.Renderer)) {
                                        Binder.queue($current, key, 'r');
                                        result = $current.Renderer[key];
                                    }
                                }
                            }
                        } else {
                            if (key === 'value') {
                                result = Object.getOwnPropertyDescriptor(Object.getPrototypeOf($node), key).get.call($node);
                            } else if (key === 'style') {
                                result = Component.get(key).get.call($node);
                            } else if (key in $node.Renderer) {
                                result = $node.Renderer[key];
                            } else {
                                result = Component.get(key).get.call($node);
                            }
                        }
                        return result;
                    },
                    set: function (val) {
                        let $current = $node;
                        if (!(key in $node.Renderer) && key[0] === '_') {
                            while ($current = $current.parentNode) {
                                if ($current?.Renderer && (key in $current.Renderer)) {
                                    break;
                                }
                            }
                        }
                        Renderer.update($current, key, val);
                        if (key[0] !== '$' && key[0] !== '_') {
                            if (key === 'value') {
                                return Object.getOwnPropertyDescriptor(Object.getPrototypeOf($node), key).set.call($node, val);
                            } else if (key === 'style' && typeof val === 'object') {
                                Component.get(key).set.call($node, val);
                            } else if (typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean') {
                                $node.setAttribute(key, val);
                            } else if (typeof val === 'function') {
                                Component.get(key).set.call($node, val);
                            }
                        } else if ('$update' in $node.Renderer && (typeof $node.Renderer.$update === 'function')) {
                            Component.$update($node);
                        }
                    },
                });
            } catch (e) { }
        },
        build: function ($node) {
            ['$type', '$text', '$html', '$nodes'].forEach(function (key) {
                if (!(key in $node.Renderer)) Binder.set($node, key);
            });
            if ($node.Inheritance) {
                $node.Inheritance.forEach(function (key) {
                    Binder.set($node, key);
                });
            }
            for (const key in $node.Renderer) {
                Binder.set($node, key);
            }
        },
        _queue: [],
        bind: function ($node, v) {
            if (typeof v === 'function') {
                const fun = function () {
                    Binder.tick.call($root, function () {
                        Binder._queue.forEach(function ($node) {
                            let needs_update = false;
                            for (const key in $node.Dirty) {
                                if (Engine.freeze($node.Renderer[key]) !== $node.Dirty[key]) {
                                    Component.set($node, key, $node.Renderer[key]);
                                    if (key[0] === '_') { needs_update = true; }
                                }
                            }
                            if (needs_update && '$update' in $node.Renderer && (typeof $node.Renderer.$update === 'function')) {
                                Component.$update($node);
                            } else { $node.Dirty = null; }
                        });

                        const index = Binder._queue.indexOf($node);
                        if (index !== -1) Binder._queue.splice(index, 1);
                    });

                    return v.apply($node, arguments);
                };
                fun.snapshot = v;
                return fun;
            } else {
                return v;
            }
        },
        queue: function ($node, key, mode) {
            const val = $node.Renderer[key];
            if (mode === 'r') {
                if (typeof val !== 'object' && !Array.isArray(val)) return;
            }
            if (Binder._queue.indexOf($node) === -1) { Binder._queue.push($node); }
            if (!$node.Dirty) $node.Dirty = {};
            if (!(key in $node.Dirty)) {
                $node.Dirty[key] = Engine.freeze($node.Renderer[key]);
            }
        },
    };

    const Factory = {
        detect: function ($context = this) {
            return Object.keys($context).filter(function (k) {
                try {
                    if (/webkitStorageInfo|webkitIndexedDB/.test(k) || $context[k] instanceof $root.Element) return false;
                    return $context[k]?.hasOwnProperty('$app');
                } catch (e) {
                    return false;
                }
            }).map(function (k) {
                return $context[k];
            });
        },
        setup: function ($context) {
            if ($context === undefined) {
                $context = $root;
            } else {
                $root = $context;
            }
            $context.DocumentFragment.prototype.$build = $context.Element.prototype.$build = function (healthy_data, inheritance, index, namespace, replace) {
                const data = Renderer.insert(healthy_data);
                const $node = Container.build(this, data, index, namespace, replace);
                Renderer.build($node, data, inheritance || [], index);
                Binder.build($node);
                Component.build($node, $node.Renderer);
                return $node;
            };
            $context.DocumentFragment.prototype.$app = $context.Element.prototype.$app = function (data, options) {
                return this.$build(data, [], null, (options?.namespace) || null, true);
            };
            $context.DocumentFragment.prototype.$snapshot = $context.Element.prototype.$snapshot = function () {
                const json = JSON.stringify(this.Renderer, function (k, v) {
                    if (typeof v === 'function' && v.snapshot) { return '(' + v.snapshot.toString() + ')'; }
                    return v;
                });
                return JSON.parse(json, function (k, v) {
                    if (typeof v === 'string' && v.indexOf('function') >= 0) { return eval(v); }
                    return v;
                });
            };
            if ($root.NodeList && !$root.NodeList.prototype.forEach) $root.NodeList.prototype.forEach = Array.prototype.forEach;
        },
        create: function ($context) {
            return Factory.detect($context).map(function (data) {
                const varName = Object.keys($context).find(key => $context[key] === data);
                const $node = $context.document.body.$build(data, []);
                if (varName) {
                    $context[varName] = $node;
                }
                return $node;
            });
        },
    };

    Factory.setup(this);

    if (this.addEventListener) {
        this.addEventListener('load', function () {
            Factory.create(this);
        });
    }

}(this));
