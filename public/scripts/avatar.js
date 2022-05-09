const Avatar = (function() {
    // This stores the available avatars
    const avatars = {
        "Colours": {
            "Red": "&#128997;",
            "Green": "&#129001;",
            "Blue": "&#128998;",
            "Purple": "&#129002;",
        },
    };

    // This function populates the avatars to a select box
    const populate = function(select) {
        for (const category in avatars) {
            const optgroup = $("<optgroup label='" + category + "'></optgroup");
            for (const name in avatars[category]) {
                optgroup.append(
                    $("<option value='" + name + "'>" +
                      avatars[category][name] + " " + name +
                      "</option>")
                );
            }
            select.append(optgroup);
        }
    };

    // This function gets the code from the avatar name
    const getCode = function(name) {
        for (const category in avatars) {
            if (name in avatars[category])
                return avatars[category][name];
        }
        return "&#128683;";
    };

    return { populate, getCode };
})();
