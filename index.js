"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@rgrove/parse-xml/dist/browser.js
  var require_browser = __commonJS({
    "node_modules/@rgrove/parse-xml/dist/browser.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export(src_exports, {
        XmlCdata: () => XmlCdata,
        XmlComment: () => XmlComment,
        XmlDeclaration: () => XmlDeclaration,
        XmlDocument: () => XmlDocument,
        XmlDocumentType: () => XmlDocumentType,
        XmlElement: () => XmlElement,
        XmlError: () => XmlError,
        XmlNode: () => XmlNode,
        XmlProcessingInstruction: () => XmlProcessingInstruction,
        XmlText: () => XmlText,
        parseXml: () => parseXml2
      });
      module.exports = __toCommonJS(src_exports);
      var emptyString = "";
      var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
      var StringScanner = class {
        constructor(string) {
          this.k = this.u(string, true);
          this.d = 0;
          this.length = string.length;
          this.l = this.k !== this.length;
          this.h = string;
          if (this.l) {
            let charsToBytes = [];
            for (let byteIndex = 0, charIndex = 0; charIndex < this.k; ++charIndex) {
              charsToBytes[charIndex] = byteIndex;
              byteIndex += string.codePointAt(byteIndex) > 65535 ? 2 : 1;
            }
            this.A = charsToBytes;
          }
        }
        /**
         * Whether the current character index is at the end of the input string.
         */
        get B() {
          return this.d >= this.k;
        }
        // -- Protected Methods ------------------------------------------------------
        /**
         * Returns the number of characters in the given string, which may differ from
         * the byte length if the string contains multibyte characters.
         */
        u(string, multiByteSafe = this.l) {
          return multiByteSafe ? string.replace(surrogatePair, "_").length : string.length;
        }
        // -- Public Methods ---------------------------------------------------------
        /**
         * Advances the scanner by the given number of characters, stopping if the end
         * of the string is reached.
         */
        p(count = 1) {
          this.d = Math.min(this.k, this.d + count);
        }
        /**
         * Returns the byte index of the given character index in the string. The two
         * may differ in strings that contain multibyte characters.
         */
        f(charIndex = this.d) {
          var _a;
          return this.l ? (_a = this.A[charIndex]) != null ? _a : Infinity : charIndex;
        }
        /**
         * Consumes and returns the given number of characters if possible, advancing
         * the scanner and stopping if the end of the string is reached.
         *
         * If no characters could be consumed, an empty string will be returned.
         */
        G(charCount = 1) {
          let chars = this.m(charCount);
          this.p(charCount);
          return chars;
        }
        /**
         * Consumes and returns the given number of bytes if possible, advancing the
         * scanner and stopping if the end of the string is reached.
         *
         * It's up to the caller to ensure that the given byte count doesn't split a
         * multibyte character.
         *
         * If no bytes could be consumed, an empty string will be returned.
         */
        v(byteCount) {
          let byteIndex = this.f();
          let result = this.h.slice(byteIndex, byteIndex + byteCount);
          this.p(this.u(result));
          return result;
        }
        /**
         * Consumes and returns all characters for which the given function returns
         * `true`, stopping when `false` is returned or the end of the input is
         * reached.
         */
        w(fn) {
          let { length, l: multiByteMode, h: string } = this;
          let startByteIndex = this.f();
          let endByteIndex = startByteIndex;
          if (multiByteMode) {
            while (endByteIndex < length) {
              let char = string[endByteIndex];
              let isSurrogatePair = char >= "\uD800" && char <= "\uDBFF";
              if (isSurrogatePair) {
                char += string[endByteIndex + 1];
              }
              if (!fn(char)) {
                break;
              }
              endByteIndex += isSurrogatePair ? 2 : 1;
            }
          } else {
            while (endByteIndex < length && fn(string[endByteIndex])) {
              ++endByteIndex;
            }
          }
          return this.v(endByteIndex - startByteIndex);
        }
        /**
         * Consumes the given string if it exists at the current character index, and
         * advances the scanner.
         *
         * If the given string doesn't exist at the current character index, an empty
         * string will be returned and the scanner will not be advanced.
         */
        b(stringToConsume) {
          let { length } = stringToConsume;
          let byteIndex = this.f();
          if (stringToConsume === this.h.slice(byteIndex, byteIndex + length)) {
            this.p(length === 1 ? 1 : this.u(stringToConsume));
            return stringToConsume;
          }
          return emptyString;
        }
        /**
         * Consumes characters until the given global regex is matched, advancing the
         * scanner up to (but not beyond) the beginning of the match. If the regex
         * doesn't match, nothing will be consumed.
         *
         * Returns the consumed string, or an empty string if nothing was consumed.
         */
        x(regex) {
          let matchByteIndex = this.h.slice(this.f()).search(regex);
          return matchByteIndex > 0 ? this.v(matchByteIndex) : emptyString;
        }
        /**
         * Consumes characters until the given string is found, advancing the scanner
         * up to (but not beyond) that point. If the string is never found, nothing
         * will be consumed.
         *
         * Returns the consumed string, or an empty string if nothing was consumed.
         */
        s(searchString) {
          let byteIndex = this.f();
          let matchByteIndex = this.h.indexOf(searchString, byteIndex);
          return matchByteIndex > 0 ? this.v(matchByteIndex - byteIndex) : emptyString;
        }
        /**
         * Returns the given number of characters starting at the current character
         * index, without advancing the scanner and without exceeding the end of the
         * input string.
         */
        m(count = 1) {
          let { d: charIndex, h: string } = this;
          return this.l ? string.slice(this.f(charIndex), this.f(charIndex + count)) : string.slice(charIndex, charIndex + count);
        }
        /**
         * Resets the scanner position to the given character _index_, or to the start
         * of the input string if no index is given.
         *
         * If _index_ is negative, the scanner position will be moved backward by that
         * many characters, stopping if the beginning of the string is reached.
         */
        n(index = 0) {
          this.d = index >= 0 ? Math.min(this.k, index) : Math.max(0, this.d + index);
        }
      };
      var attValueCharDoubleQuote = /["&<]/;
      var attValueCharSingleQuote = /['&<]/;
      var attValueNormalizedWhitespace = /\r\n|[\n\r\t]/g;
      var endCharData = /<|&|]]>/;
      var predefinedEntities = Object.freeze(Object.assign(/* @__PURE__ */ Object.create(null), {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        quot: '"'
      }));
      function isNameChar(char) {
        let cp = char.codePointAt(0);
        return cp >= 97 && cp <= 122 || cp >= 65 && cp <= 90 || cp >= 48 && cp <= 57 || cp === 45 || cp === 46 || cp === 183 || cp >= 768 && cp <= 879 || cp === 8255 || cp === 8256 || isNameStartChar(char, cp);
      }
      function isNameStartChar(char, cp = char.codePointAt(0)) {
        return cp >= 97 && cp <= 122 || cp >= 65 && cp <= 90 || cp === 58 || cp === 95 || cp >= 192 && cp <= 214 || cp >= 216 && cp <= 246 || cp >= 248 && cp <= 767 || cp >= 880 && cp <= 893 || cp >= 895 && cp <= 8191 || cp === 8204 || cp === 8205 || cp >= 8304 && cp <= 8591 || cp >= 11264 && cp <= 12271 || cp >= 12289 && cp <= 55295 || cp >= 63744 && cp <= 64975 || cp >= 65008 && cp <= 65533 || cp >= 65536 && cp <= 983039;
      }
      function isReferenceChar(char) {
        return char === "#" || isNameChar(char);
      }
      function isWhitespace(char) {
        let cp = char.codePointAt(0);
        return cp === 32 || cp === 9 || cp === 10 || cp === 13;
      }
      function isXmlCodePoint(cp) {
        return cp >= 32 && cp <= 55295 || cp === 10 || cp === 9 || cp === 13 || cp >= 57344 && cp <= 65533 || cp >= 65536 && cp <= 1114111;
      }
      var _XmlNode = class _XmlNode2 {
        constructor() {
          this.parent = null;
          this.start = -1;
          this.end = -1;
        }
        /**
         * Document that contains this node, or `null` if this node is not associated
         * with a document.
         */
        get document() {
          var _a, _b;
          return (_b = (_a = this.parent) == null ? void 0 : _a.document) != null ? _b : null;
        }
        /**
         * Whether this node is the root node of the document (also known as the
         * document element).
         */
        get isRootNode() {
          return this.parent !== null && this.parent === this.document && this.type === _XmlNode2.TYPE_ELEMENT;
        }
        /**
         * Whether whitespace should be preserved in the content of this element and
         * its children.
         *
         * This is influenced by the value of the special `xml:space` attribute, and
         * will be `true` for any node whose `xml:space` attribute is set to
         * "preserve". If a node has no such attribute, it will inherit the value of
         * the nearest ancestor that does (if any).
         *
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-white-space
         */
        get preserveWhitespace() {
          var _a;
          return !!((_a = this.parent) == null ? void 0 : _a.preserveWhitespace);
        }
        /**
         * Type of this node.
         *
         * The value of this property is a string that matches one of the static
         * `TYPE_*` properties on the `XmlNode` class (e.g. `TYPE_ELEMENT`,
         * `TYPE_TEXT`, etc.).
         *
         * The `XmlNode` class itself is a base class and doesn't have its own type
         * name.
         */
        get type() {
          return "";
        }
        /**
         * Returns a JSON-serializable object representing this node, minus properties
         * that could result in circular references.
         */
        toJSON() {
          let json = {
            type: this.type
          };
          if (this.isRootNode) {
            json.isRootNode = true;
          }
          if (this.preserveWhitespace) {
            json.preserveWhitespace = true;
          }
          if (this.start !== -1) {
            json.start = this.start;
            json.end = this.end;
          }
          return json;
        }
      };
      _XmlNode.TYPE_CDATA = "cdata";
      _XmlNode.TYPE_COMMENT = "comment";
      _XmlNode.TYPE_DOCUMENT = "document";
      _XmlNode.TYPE_DOCUMENT_TYPE = "doctype";
      _XmlNode.TYPE_ELEMENT = "element";
      _XmlNode.TYPE_PROCESSING_INSTRUCTION = "pi";
      _XmlNode.TYPE_TEXT = "text";
      _XmlNode.TYPE_XML_DECLARATION = "xmldecl";
      var XmlNode = _XmlNode;
      var XmlText = class extends XmlNode {
        constructor(text = "") {
          super();
          this.text = text;
        }
        get type() {
          return XmlNode.TYPE_TEXT;
        }
        toJSON() {
          return Object.assign(XmlNode.prototype.toJSON.call(this), {
            text: this.text
          });
        }
      };
      var XmlCdata = class extends XmlText {
        get type() {
          return XmlNode.TYPE_CDATA;
        }
      };
      var XmlComment = class extends XmlNode {
        constructor(content = "") {
          super();
          this.content = content;
        }
        get type() {
          return XmlNode.TYPE_COMMENT;
        }
        toJSON() {
          return Object.assign(XmlNode.prototype.toJSON.call(this), {
            content: this.content
          });
        }
      };
      var XmlDeclaration = class extends XmlNode {
        constructor(version, encoding, standalone) {
          super();
          this.version = version;
          this.encoding = encoding != null ? encoding : null;
          this.standalone = standalone != null ? standalone : null;
        }
        get type() {
          return XmlNode.TYPE_XML_DECLARATION;
        }
        toJSON() {
          let json = XmlNode.prototype.toJSON.call(this);
          json.version = this.version;
          for (let key of ["encoding", "standalone"]) {
            if (this[key] !== null) {
              json[key] = this[key];
            }
          }
          return json;
        }
      };
      var XmlElement = class _XmlElement extends XmlNode {
        constructor(name, attributes = /* @__PURE__ */ Object.create(null), children = []) {
          super();
          this.name = name;
          this.attributes = attributes;
          this.children = children;
        }
        /**
         * Whether this element is empty (meaning it has no children).
         */
        get isEmpty() {
          return this.children.length === 0;
        }
        get preserveWhitespace() {
          let node = this;
          while (node instanceof _XmlElement) {
            if ("xml:space" in node.attributes) {
              return node.attributes["xml:space"] === "preserve";
            }
            node = node.parent;
          }
          return false;
        }
        /**
         * Text content of this element and all its descendants.
         */
        get text() {
          return this.children.map((child) => "text" in child ? child.text : "").join("");
        }
        get type() {
          return XmlNode.TYPE_ELEMENT;
        }
        toJSON() {
          return Object.assign(XmlNode.prototype.toJSON.call(this), {
            name: this.name,
            attributes: this.attributes,
            children: this.children.map((child) => child.toJSON())
          });
        }
      };
      var XmlDocument = class extends XmlNode {
        constructor(children = []) {
          super();
          this.children = children;
        }
        get document() {
          return this;
        }
        /**
         * Root element of this document, or `null` if this document is empty.
         */
        get root() {
          for (let child of this.children) {
            if (child instanceof XmlElement) {
              return child;
            }
          }
          return null;
        }
        /**
         * Text content of this document and all its descendants.
         */
        get text() {
          return this.children.map((child) => "text" in child ? child.text : "").join("");
        }
        get type() {
          return XmlNode.TYPE_DOCUMENT;
        }
        toJSON() {
          return Object.assign(XmlNode.prototype.toJSON.call(this), {
            children: this.children.map((child) => child.toJSON())
          });
        }
      };
      var XmlDocumentType = class extends XmlNode {
        constructor(name, publicId, systemId, internalSubset) {
          super();
          this.name = name;
          this.publicId = publicId != null ? publicId : null;
          this.systemId = systemId != null ? systemId : null;
          this.internalSubset = internalSubset != null ? internalSubset : null;
        }
        get type() {
          return XmlNode.TYPE_DOCUMENT_TYPE;
        }
        toJSON() {
          let json = XmlNode.prototype.toJSON.call(this);
          json.name = this.name;
          for (let key of ["publicId", "systemId", "internalSubset"]) {
            if (this[key] !== null) {
              json[key] = this[key];
            }
          }
          return json;
        }
      };
      var XmlError = class extends Error {
        constructor(message, charIndex, xml) {
          let column = 1;
          let excerpt = "";
          let line = 1;
          for (let i = 0; i < charIndex; ++i) {
            let char = xml[i];
            if (char === "\n") {
              column = 1;
              excerpt = "";
              line += 1;
            } else {
              column += 1;
              excerpt += char;
            }
          }
          let eol = xml.indexOf("\n", charIndex);
          excerpt += eol === -1 ? xml.slice(charIndex) : xml.slice(charIndex, eol);
          let excerptStart = 0;
          if (excerpt.length > 50) {
            if (column < 40) {
              excerpt = excerpt.slice(0, 50);
            } else {
              excerptStart = column - 20;
              excerpt = excerpt.slice(excerptStart, column + 30);
            }
          }
          super(
            `${message} (line ${line}, column ${column})
  ${excerpt}
` + " ".repeat(column - excerptStart + 1) + "^\n"
          );
          this.column = column;
          this.excerpt = excerpt;
          this.line = line;
          this.name = "XmlError";
          this.pos = charIndex;
        }
      };
      var XmlProcessingInstruction = class extends XmlNode {
        constructor(name, content = "") {
          super();
          this.name = name;
          this.content = content;
        }
        get type() {
          return XmlNode.TYPE_PROCESSING_INSTRUCTION;
        }
        toJSON() {
          return Object.assign(XmlNode.prototype.toJSON.call(this), {
            name: this.name,
            content: this.content
          });
        }
      };
      var emptyString2 = "";
      var Parser = class {
        /**
         * @param xml XML string to parse.
         * @param options Parser options.
         */
        constructor(xml, options = {}) {
          let doc = this.document = new XmlDocument();
          this.j = doc;
          this.g = options;
          this.c = new StringScanner(xml);
          if (this.g.includeOffsets) {
            doc.start = 0;
            doc.end = xml.length;
          }
          this.parse();
        }
        /**
         * Adds the given `XmlNode` as a child of `this.currentNode`.
         */
        i(node, charIndex) {
          node.parent = this.j;
          if (this.g.includeOffsets) {
            node.start = this.c.f(charIndex);
            node.end = this.c.f();
          }
          this.j.children.push(node);
          return true;
        }
        /**
         * Adds the given _text_ to the document, either by appending it to a
         * preceding `XmlText` node (if possible) or by creating a new `XmlText` node.
         */
        y(text, charIndex) {
          let { children } = this.j;
          let { length } = children;
          text = normalizeLineBreaks(text);
          if (length > 0) {
            let prevNode = children[length - 1];
            if ((prevNode == null ? void 0 : prevNode.type) === XmlNode.TYPE_TEXT) {
              let textNode = prevNode;
              textNode.text += text;
              if (this.g.includeOffsets) {
                textNode.end = this.c.f();
              }
              return true;
            }
          }
          return this.i(new XmlText(text), charIndex);
        }
        /**
         * Consumes element attributes.
         *
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-starttags
         */
        H() {
          let attributes = /* @__PURE__ */ Object.create(null);
          while (this.e()) {
            let attrName = this.q();
            if (!attrName) {
              break;
            }
            let attrValue = this.t() && this.I();
            if (attrValue === false) {
              throw this.a("Attribute value expected");
            }
            if (attrName in attributes) {
              throw this.a(`Duplicate attribute: ${attrName}`);
            }
            if (attrName === "xml:space" && attrValue !== "default" && attrValue !== "preserve") {
              throw this.a('Value of the `xml:space` attribute must be "default" or "preserve"');
            }
            attributes[attrName] = attrValue;
          }
          if (this.g.sortAttributes) {
            let attrNames = Object.keys(attributes).sort();
            let sortedAttributes = /* @__PURE__ */ Object.create(null);
            for (let i = 0; i < attrNames.length; ++i) {
              let attrName = attrNames[i];
              sortedAttributes[attrName] = attributes[attrName];
            }
            attributes = sortedAttributes;
          }
          return attributes;
        }
        /**
         * Consumes an `AttValue` (attribute value) if possible.
         *
         * @returns
         *   Contents of the `AttValue` minus quotes, or `false` if nothing was
         *   consumed. An empty string indicates that an `AttValue` was consumed but
         *   was empty.
         *
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-AttValue
         */
        I() {
          let { c: scanner } = this;
          let quote = scanner.m();
          if (quote !== '"' && quote !== "'") {
            return false;
          }
          scanner.p();
          let chars;
          let isClosed = false;
          let value = emptyString2;
          let regex = quote === '"' ? attValueCharDoubleQuote : attValueCharSingleQuote;
          matchLoop: while (!scanner.B) {
            chars = scanner.x(regex);
            if (chars) {
              this.o(chars);
              value += chars.replace(attValueNormalizedWhitespace, " ");
            }
            switch (scanner.m()) {
              case quote:
                isClosed = true;
                break matchLoop;
              case "&":
                value += this.C();
                continue;
              case "<":
                throw this.a("Unescaped `<` is not allowed in an attribute value");
              default:
                break matchLoop;
            }
          }
          if (!isClosed) {
            throw this.a("Unclosed attribute");
          }
          scanner.p();
          return value;
        }
        /**
         * Consumes a CDATA section if possible.
         *
         * @returns Whether a CDATA section was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-cdata-sect
         */
        J() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          if (!scanner.b("<![CDATA[")) {
            return false;
          }
          let text = scanner.s("]]>");
          this.o(text);
          if (!scanner.b("]]>")) {
            throw this.a("Unclosed CDATA section");
          }
          return this.g.preserveCdata ? this.i(new XmlCdata(normalizeLineBreaks(text)), startIndex) : this.y(text, startIndex);
        }
        /**
         * Consumes character data if possible.
         *
         * @returns Whether character data was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#dt-chardata
         */
        K() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          let charData = scanner.x(endCharData);
          if (!charData) {
            return false;
          }
          this.o(charData);
          if (scanner.m(3) === "]]>") {
            throw this.a("Element content may not contain the CDATA section close delimiter `]]>`");
          }
          return this.y(charData, startIndex);
        }
        /**
         * Consumes a comment if possible.
         *
         * @returns Whether a comment was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Comment
         */
        D() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          if (!scanner.b("<!--")) {
            return false;
          }
          let content = scanner.s("--");
          this.o(content);
          if (!scanner.b("-->")) {
            if (scanner.m(2) === "--") {
              throw this.a("The string `--` isn't allowed inside a comment");
            }
            throw this.a("Unclosed comment");
          }
          return this.g.preserveComments ? this.i(new XmlComment(normalizeLineBreaks(content)), startIndex) : true;
        }
        /**
         * Consumes a reference in a content context if possible.
         *
         * This differs from `consumeReference()` in that a consumed reference will be
         * added to the document as a text node instead of returned.
         *
         * @returns Whether a reference was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#entproc
         */
        L() {
          let startIndex = this.c.d;
          let ref = this.C();
          return ref ? this.y(ref, startIndex) : false;
        }
        /**
         * Consumes a doctype declaration if possible.
         *
         * This is a loose implementation since doctype declarations are currently
         * discarded without further parsing.
         *
         * @returns Whether a doctype declaration was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#dtd
         */
        M() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          if (!scanner.b("<!DOCTYPE")) {
            return false;
          }
          let name = this.e() && this.q();
          if (!name) {
            throw this.a("Expected a name");
          }
          let publicId;
          let systemId;
          if (this.e()) {
            if (scanner.b("PUBLIC")) {
              publicId = this.e() && this.N();
              if (publicId === false) {
                throw this.a("Expected a public identifier");
              }
              this.e();
            }
            if (publicId !== void 0 || scanner.b("SYSTEM")) {
              this.e();
              systemId = this.r();
              if (systemId === false) {
                throw this.a("Expected a system identifier");
              }
              this.e();
            }
          }
          let internalSubset;
          if (scanner.b("[")) {
            internalSubset = scanner.x(/\][\x20\t\r\n]*>/);
            if (!scanner.b("]")) {
              throw this.a("Unclosed internal subset");
            }
            this.e();
          }
          if (!scanner.b(">")) {
            throw this.a("Unclosed doctype declaration");
          }
          return this.g.preserveDocumentType ? this.i(new XmlDocumentType(name, publicId, systemId, internalSubset), startIndex) : true;
        }
        /**
         * Consumes an element if possible.
         *
         * @returns Whether an element was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-element
         */
        E() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          if (!scanner.b("<")) {
            return false;
          }
          let name = this.q();
          if (!name) {
            scanner.n(startIndex);
            return false;
          }
          let attributes = this.H();
          let isEmpty = !!scanner.b("/>");
          let element = new XmlElement(name, attributes);
          element.parent = this.j;
          if (!isEmpty) {
            if (!scanner.b(">")) {
              throw this.a(`Unclosed start tag for element \`${name}\``);
            }
            this.j = element;
            do {
              this.K();
            } while (this.E() || this.L() || this.J() || this.F() || this.D());
            let endTagMark = scanner.d;
            let endTagName;
            if (!scanner.b("</") || !(endTagName = this.q()) || endTagName !== name) {
              scanner.n(endTagMark);
              throw this.a(`Missing end tag for element ${name}`);
            }
            this.e();
            if (!scanner.b(">")) {
              throw this.a(`Unclosed end tag for element ${name}`);
            }
            this.j = element.parent;
          }
          return this.i(element, startIndex);
        }
        /**
         * Consumes an `Eq` production if possible.
         *
         * @returns Whether an `Eq` production was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Eq
         */
        t() {
          this.e();
          if (this.c.b("=")) {
            this.e();
            return true;
          }
          return false;
        }
        /**
         * Consumes `Misc` content if possible.
         *
         * @returns Whether anything was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Misc
         */
        z() {
          return this.D() || this.F() || this.e();
        }
        /**
         * Consumes one or more `Name` characters if possible.
         *
         * @returns `Name` characters, or an empty string if none were consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Name
         */
        q() {
          return isNameStartChar(this.c.m()) ? this.c.w(isNameChar) : emptyString2;
        }
        /**
         * Consumes a processing instruction if possible.
         *
         * @returns Whether a processing instruction was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-pi
         */
        F() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          if (!scanner.b("<?")) {
            return false;
          }
          let name = this.q();
          if (name) {
            if (name.toLowerCase() === "xml") {
              scanner.n(startIndex);
              throw this.a("XML declaration isn't allowed here");
            }
          } else {
            throw this.a("Invalid processing instruction");
          }
          if (!this.e()) {
            if (scanner.b("?>")) {
              return this.i(new XmlProcessingInstruction(name), startIndex);
            }
            throw this.a("Whitespace is required after a processing instruction name");
          }
          let content = scanner.s("?>");
          this.o(content);
          if (!scanner.b("?>")) {
            throw this.a("Unterminated processing instruction");
          }
          return this.i(new XmlProcessingInstruction(name, normalizeLineBreaks(content)), startIndex);
        }
        /**
         * Consumes a prolog if possible.
         *
         * @returns Whether a prolog was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-prolog-dtd
         */
        O() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          this.P();
          while (this.z()) {
          }
          if (this.M()) {
            while (this.z()) {
            }
          }
          return startIndex < scanner.d;
        }
        /**
         * Consumes a public identifier literal if possible.
         *
         * @returns
         *   Value of the public identifier literal minus quotes, or `false` if
         *   nothing was consumed. An empty string indicates that a public id literal
         *   was consumed but was empty.
         *
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-PubidLiteral
         */
        N() {
          let startIndex = this.c.d;
          let value = this.r();
          if (value !== false && !/^[-\x20\r\na-zA-Z0-9'()+,./:=?;!*#@$_%]*$/.test(value)) {
            this.c.n(startIndex);
            throw this.a("Invalid character in public identifier");
          }
          return value;
        }
        /**
         * Consumes a reference if possible.
         *
         * This differs from `consumeContentReference()` in that a consumed reference
         * will be returned rather than added to the document.
         *
         * @returns
         *   Parsed reference value, or `false` if nothing was consumed (to
         *   distinguish from a reference that resolves to an empty string).
         *
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Reference
         */
        C() {
          let { c: scanner } = this;
          if (!scanner.b("&")) {
            return false;
          }
          let ref = scanner.w(isReferenceChar);
          if (scanner.G() !== ";") {
            throw this.a("Unterminated reference (a reference must end with `;`)");
          }
          let parsedValue;
          if (ref[0] === "#") {
            let codePoint = ref[1] === "x" ? parseInt(ref.slice(2), 16) : parseInt(ref.slice(1), 10);
            if (isNaN(codePoint)) {
              throw this.a("Invalid character reference");
            }
            if (!isXmlCodePoint(codePoint)) {
              throw this.a("Character reference resolves to an invalid character");
            }
            parsedValue = String.fromCodePoint(codePoint);
          } else {
            parsedValue = predefinedEntities[ref];
            if (parsedValue === void 0) {
              let {
                ignoreUndefinedEntities,
                resolveUndefinedEntity
              } = this.g;
              let wrappedRef = `&${ref};`;
              if (resolveUndefinedEntity) {
                let resolvedValue = resolveUndefinedEntity(wrappedRef);
                if (resolvedValue !== null && resolvedValue !== void 0) {
                  let type = typeof resolvedValue;
                  if (type !== "string") {
                    throw new TypeError(`\`resolveUndefinedEntity()\` must return a string, \`null\`, or \`undefined\`, but returned a value of type ${type}`);
                  }
                  return resolvedValue;
                }
              }
              if (ignoreUndefinedEntities) {
                return wrappedRef;
              }
              scanner.n(-wrappedRef.length);
              throw this.a(`Named entity isn't defined: ${wrappedRef}`);
            }
          }
          return parsedValue;
        }
        /**
         * Consumes a `SystemLiteral` if possible.
         *
         * A `SystemLiteral` is similar to an attribute value, but allows the
         * characters `<` and `&` and doesn't replace references.
         *
         * @returns
         *   Value of the `SystemLiteral` minus quotes, or `false` if nothing was
         *   consumed. An empty string indicates that a `SystemLiteral` was consumed
         *   but was empty.
         *
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-SystemLiteral
         */
        r() {
          let { c: scanner } = this;
          let quote = scanner.b('"') || scanner.b("'");
          if (!quote) {
            return false;
          }
          let value = scanner.s(quote);
          this.o(value);
          if (!scanner.b(quote)) {
            throw this.a("Missing end quote");
          }
          return value;
        }
        /**
         * Consumes one or more whitespace characters if possible.
         *
         * @returns Whether any whitespace characters were consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#white
         */
        e() {
          return !!this.c.w(isWhitespace);
        }
        /**
         * Consumes an XML declaration if possible.
         *
         * @returns Whether an XML declaration was consumed.
         * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-XMLDecl
         */
        P() {
          let { c: scanner } = this;
          let startIndex = scanner.d;
          if (!scanner.b("<?xml")) {
            return false;
          }
          if (!this.e()) {
            throw this.a("Invalid XML declaration");
          }
          let version = !!scanner.b("version") && this.t() && this.r();
          if (version === false) {
            throw this.a("XML version is missing or invalid");
          } else if (!/^1\.[0-9]+$/.test(version)) {
            throw this.a("Invalid character in version number");
          }
          let encoding;
          let standalone;
          if (this.e()) {
            encoding = !!scanner.b("encoding") && this.t() && this.r();
            if (encoding) {
              if (!/^[A-Za-z][\w.-]*$/.test(encoding)) {
                throw this.a("Invalid character in encoding name");
              }
              this.e();
            }
            standalone = !!scanner.b("standalone") && this.t() && this.r();
            if (standalone) {
              if (standalone !== "yes" && standalone !== "no") {
                throw this.a('Only "yes" and "no" are permitted as values of `standalone`');
              }
              this.e();
            }
          }
          if (!scanner.b("?>")) {
            throw this.a("Invalid or unclosed XML declaration");
          }
          return this.g.preserveXmlDeclaration ? this.i(new XmlDeclaration(
            version,
            encoding || void 0,
            standalone || void 0
          ), startIndex) : true;
        }
        /**
         * Returns an `XmlError` for the current scanner position.
         */
        a(message) {
          let { c: scanner } = this;
          return new XmlError(message, scanner.d, scanner.h);
        }
        /**
         * Parses the XML input.
         */
        parse() {
          this.c.b("\uFEFF");
          this.O();
          if (!this.E()) {
            throw this.a("Root element is missing or invalid");
          }
          while (this.z()) {
          }
          if (!this.c.B) {
            throw this.a("Extra content at the end of the document");
          }
        }
        /**
         * Throws an invalid character error if any character in the given _string_
         * isn't a valid XML character.
         */
        o(string) {
          let { length } = string;
          for (let i = 0; i < length; ++i) {
            let cp = string.codePointAt(i);
            if (!isXmlCodePoint(cp)) {
              this.c.n(-([...string].length - i));
              throw this.a("Invalid character");
            }
            if (cp > 65535) {
              i += 1;
            }
          }
        }
      };
      function normalizeLineBreaks(text) {
        let i = 0;
        while ((i = text.indexOf("\r", i)) !== -1) {
          text = text[i + 1] === "\n" ? text.slice(0, i) + text.slice(i + 1) : text.slice(0, i) + "\n" + text.slice(i + 1);
        }
        return text;
      }
      function parseXml2(xml, options) {
        return new Parser(xml, options).document;
      }
    }
  });

  // src/index.ts
  var import_parse_xml = __toESM(require_browser());
  var dropZone = document.getElementById("drop_zone") ?? document.createElement("div");
  var dropZoneMessage = document.querySelector("#drop_zone p") ?? document.createElement("p");
  dropZone?.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.remove("error");
    dropZoneMessage.textContent = "Drop blueprint .sbc file here or click to upload";
    dropZone.classList.add("dragover");
  });
  dropZone?.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
  });
  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer?.items[0].kind !== "file") {
      dropZoneMessage.textContent = "No file dropped!";
      dropZone.classList.add("error");
    }
    if (e.dataTransfer.items.length > 1) {
      dropZoneMessage.textContent = "Too many files dropped!";
      dropZone.classList.add("error");
    }
    const file = e.dataTransfer?.items[0].getAsFile();
    if (!file) {
      dropZoneMessage.textContent = "No file dropped!";
      dropZone.classList.add("error");
    }
    if (!file?.name.endsWith(".sbc")) {
      dropZoneMessage.textContent = "Not a .sbc file!";
      dropZone.classList.add("error");
    }
    const fileArray = [...e.dataTransfer.files];
    const reader = new FileReader();
    reader.onload = (event) => {
      const blueprint = event.target?.result;
      if (typeof blueprint !== "string") {
        throw new Error("blueprint is not a string, but >" + typeof blueprint + "< instead");
      }
      analyzeBlueprint(blueprint);
    };
    reader.onerror = () => {
      dropZoneMessage.textContent = "Not a .sbc file!";
      dropZone.classList.add("error");
    };
    reader.readAsText(file ?? new Blob());
  });
  function analyzeBlueprint(content) {
    const jsonBP = (0, import_parse_xml.parseXml)(content);
    console.log(jsonBP);
  }
})();
/*! Bundled license information:

@rgrove/parse-xml/dist/browser.js:
  (*! @rgrove/parse-xml v4.2.0 | ISC License | Copyright Ryan Grove *)
*/
