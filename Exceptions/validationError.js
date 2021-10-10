export default class JoiError extends Error {
  constructor(title, detail, code, status, source, meta) {
    super(detail);
    this.code = code || 44;
    this.detail = detail || "Some thing went wrong in your validation.";
    this.status = status || 401;
    this.source = source || { pointer: "/contact", parameter: "input" };
    this.title = title || "ValidationError";
    this.meta = meta || {
      type: "value error .",
    };
  }
}
