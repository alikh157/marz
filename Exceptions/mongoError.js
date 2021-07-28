export default class mongoError extends Error {
  constructor(title, detail, status, code, source, meta) {
    super(detail);
    this.title = title || "ValidationError";
    this.status = status || 401;
    this.source = source || { pointer: "/contact", parameter: "Email" };
    this.meta = meta || {
      type: "unique item error .",
    };
    this.detail = detail || "Some thing went wrong in your validation";
    this.code = code || 44;
  }
}
