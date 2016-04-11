export default function(Klass) {
  return (target) => {
    target.boot = function (app) {
      const instance = new Klass(app);

      return instance.createMiddleware();
    };
  };
}
