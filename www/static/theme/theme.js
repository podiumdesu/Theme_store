'use strict';exports.__esModule = true;var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);var _inherits2 = require('babel-runtime/helpers/inherits');var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');var _base2 = _interopRequireDefault(_base);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _class = function (_Base) {(0, _inherits3.default)(_class, _Base);function _class() {(0, _classCallCheck3.default)(this, _class);return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));}


  /**
                                                                                                                                                                                                                                                                                                                                                                                                     * index action
                                                                                                                                                                                                                                                                                                                                                                                                     * @return {Promise} []
                                                                                                                                                                                                                                                                                                                                                                                                     */_class.prototype.
  indexAction = function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {var listModel, themelist;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              //auto render template file index_index.html
              listModel = this.model('list');
              //let guid = listModel.newGUID();
              //let insertId = await listModel.add({theme_uid:guid,theme_name:'test',theme_imgsrc:'test',theme_marking:5.0,theme_tags:'test-a,test-b', theme_description:'test', theme_downloadtimes:2, theme_lastupdated:'2017-06-25'});
              _context.next = 3;return listModel.select();case 3:themelist = _context.sent;
              this.assign({ themelist: themelist });return _context.abrupt('return',
              this.display());case 6:case 'end':return _context.stop();}}}, _callee, this);}));function indexAction() {return _ref.apply(this, arguments);}return indexAction;}();_class.prototype.

  detailAction = function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {var id, listModel, data, d;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
              //auto render template file index_index.html
              id = this.get('id');
              listModel = this.model('list');
              //let guid = listModel.newGUID();
              //let insertId = await listModel.add({theme_uid:guid,theme_name:'test',theme_imgsrc:'test',theme_marking:5.0,theme_tags:'test-a,test-b', theme_description:'test', theme_downloadtimes:2, theme_lastupdated:'2017-06-25'});
              _context2.next = 4;return listModel.where({ theme_name: id }).find();case 4:data = _context2.sent;
              d = new Date(data.theme_lastupdated);
              data.theme_lastupdated = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
              data.theme_tags = data.theme_tags.split(',');
              data.theme_lastTags = data.theme_tags.pop();
              this.assign({ data: data });return _context2.abrupt('return',
              this.display());case 11:case 'end':return _context2.stop();}}}, _callee2, this);}));function detailAction() {return _ref2.apply(this, arguments);}return detailAction;}();_class.prototype.

  downloadAction = function downloadAction() {
    var file = __filename;
    this.download(file);
  };return _class;}(_base2.default);exports.default = _class;