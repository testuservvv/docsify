/**
 * Reference https://github.com/njleonzhang/docsify-edit-on-github
 */
(function(win) {
  function isFunction(functionToCheck) {
    return (
      functionToCheck &&
      {}.toString.call(functionToCheck) === "[object Function]"
    );
  }

  win.EditOnGithubPlugin = {};

  function create(docBase, docEditBase, title, exclude) {
    title = title || "Edit on github";
    docEditBase = docEditBase || docBase.replace(/\/blob\//, "/edit/");
    exclude = exclude || [];

    function editDoc(event, vm) {
      var docName = vm.route.file;

      if (docName) {
        var editLink = docEditBase + docName;
        window.open(editLink);
        event.preventDefault();
        return false;
      } else {
        return true;
      }
    }

    win.EditOnGithubPlugin.editDoc = editDoc;

    function generateHeader(title) {
      return (header = [
        '<div style="overflow: auto">',
        '<p style="float: right"><a style="text-decoration: underline; cursor: pointer"',
        'onclick="EditOnGithubPlugin.onClick(event)">',
        title,
        "</a></p>",
        "</div>"
      ].join(""));
    }

    return function(hook, vm) {
      win.EditOnGithubPlugin.onClick = function(event) {
        EditOnGithubPlugin.editDoc(event, vm);
      };

      hook.afterEach(function(html) {
        if (exclude.includes(vm.route.file)) {
          return html;
        }
        var header = generateHeader(
          isFunction(title) ? title(vm.route.file) : title
        );
        return header + html;
      });
    };
  }

  win.EditOnGithubPlugin.create = create;
})(window);
