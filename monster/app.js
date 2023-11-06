const Logo = {
    "$type": "div",
    "id": "logo",
    "$nodes": [
        {
            "$type": "h1",
            "$nodes": [
                {
                    "$type": "a",
                    "href": "#",
                    "$text": "monster"
                }
            ]
        },
        {
            "$type": "h2",
            "$nodes": [
                {
                    "$type": "a",
                    "href": "#",
                    "$text": "classic retro style"
                }
            ]
        }
    ]
}

const Menu = {
    "$type": "nav",
    "id": "menu",
    "$nodes": [
        {
            "$type": "ul",
            "$nodes": [
                {
                    "$type": "li",
                    "class": "active",
                    "$nodes": [
                        {
                            "$type": "a",
                            "href": "#",
                            "accesskey": "1",
                            "title": "",
                            "$text": "Home"
                        }
                    ]
                },
                {
                    "$type": "li",
                    "$nodes": [
                        {
                            "$type": "a",
                            "href": "#",
                            "accesskey": "2",
                            "title": "",
                            "$text": "Blog"
                        }
                    ]
                },
                {
                    "$type": "li",
                    "$nodes": [
                        {
                            "$type": "a",
                            "href": "#",
                            "accesskey": "3",
                            "title": "",
                            "$text": "Photos"
                        }
                    ]
                },
                {
                    "$type": "li",
                    "$nodes": [
                        {
                            "$type": "a",
                            "href": "#",
                            "accesskey": "4",
                            "title": "",
                            "$text": "About"
                        }
                    ]
                },
                {
                    "$type": "li",
                    "$nodes": [
                        {
                            "$type": "a",
                            "href": "#",
                            "accesskey": "5",
                            "title": "",
                            "$text": "Contact"
                        }
                    ]
                }
            ]
        }
    ]
}

var Header = {
    "$app": true,
    "id": "header",
    "$nodes": [Logo, Menu]
}

const Content = {
    "$type": "section",
    "id": "posts",
    "$nodes": [
        {
            "$type": "div",
            "class": "post",
            "$nodes": [
                {
                    "$type": "h2",
                    "class": "title",
                    "$text": "Welcome to monster!"
                },
                {
                    "$type": "div",
                    "class": "meta",
                    "$nodes": [
                        {
                            "$type": "p",
                            "class": "date",
                            "$text": "Posted on February 25, 2007 by John Doe"
                        },
                        {
                            "$type": "p",
                            "$nodes": [
                                {
                                    "$type": "span",
                                    "$text": "Filed under "
                                },
                                {
                                    "$type": "a",
                                    "href": "#",
                                    "class": "category",
                                    "$text": "Uncategorized"
                                },
                                {
                                    "$type": "span",
                                    "$text": " | "
                                },
                                {
                                    "$type": "a",
                                    "href": "#",
                                    "class": "comments",
                                    "$text": "28 Comments"
                                }
                            ]
                        }
                    ]
                },
                {
                    "$type": "div",
                    "class": "story",
                    "$nodes": [
                        {
                            "$type": "p",
                            "$nodes": [
                                {
                                    "$type": "strong",
                                    "$text": "monster"
                                },
                                {
                                    "$type": "text",
                                    "$text": " is a new template from "
                                },
                                {
                                    "$type": "a",
                                    "href": "https://hollerith.github.io/",
                                    "$text": "hollerith"
                                },
                                {
                                    "$type": "text",
                                    "$text": ". Lorem ipsum purus in mollis nunc sed id semper. Suspendisse faucibus interdum posuere lorem ipsum. Dictum non consectetur a erat. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sed adipiscing diam donec adipiscing tristique risus nec feugiat. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. In nibh mauris cursus mattis molestie a iaculis at erat. Velit aliquet sagittis id consectetur purus ut faucibus. Lorem dolor sed viverra ipsum. Facilisis gravida neque convallis a cras. Adipiscing vitae proin sagittis nisl rhoncus. Odio eu feugiat pretium nibh ipsum. Sit amet nulla facilisi morbi. Viverra mauris in aliquam sem. Vitae justo eget magna fermentum. Ultrices dui sapien eget mi proin sed libero. Convallis a cras semper auctor neque vitae tempus quam. Netus et malesuada fames ac turpis egestas. Morbi enim nunc faucibus a pellentesque sit amet porttitor. Suspendisse potenti nullam ac tortor vitae. "
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "$type": "div",
            "class": "post",
            "$nodes": [
                {
                    "$type": "h2",
                    "class": "title",
                    "$text": "A Few Examples of Common Tags"
                },
                {
                    "$type": "div",
                    "class": "meta",
                    "$nodes": [
                        {
                            "$type": "p",
                            "class": "date",
                            "$text": "Posted on February 25, 2007 by John Doe"
                        },
                        {
                            "$type": "p",
                            "$nodes": [
                                {
                                    "$type": "span",
                                    "$text": "Filed under "
                                },
                                {
                                    "$type": "a",
                                    "href": "#",
                                    "class": "category",
                                    "$text": "Uncategorized"
                                },
                                {
                                    "$type": "span",
                                    "$text": " | "
                                },
                                {
                                    "$type": "a",
                                    "href": "#",
                                    "class": "comments",
                                    "$text": "28 Comments"
                                }
                            ]
                        }
                    ]
                },
                {
                    "$type": "div",
                    "class": "story",
                    "$nodes": [
                        {
                            "$type": "p",
                            "$nodes": [
                                {
                                    "$type": "strong"
                                },
                                {
                                    "$type": "text",
                                    "$text": "This is an example of a paragraph followed by a blockquote. In posuere eleifend odio. Quisque semper augue mattis wisi. Maecenas ligula. Pellentesque viverra vulputate enim. Aliquam erat volutpat lorem ipsum dolorem."
                                }
                            ]
                        },
                        {
                            "$type": "blockquote",
                            "$nodes": [
                                {
                                    "$type": "p",
                                    "$text": "Pellentesque tristique ante ut risus. Quisque dictum. Integer nisl risus, sagittis convallis, rutrum id, elementum congue, nibh. Suspendisse dictum porta lectus. Donec placerat odio"
                                }
                            ]
                        },
                        {
                            "$type": "h3",
                            "$text": "Heading Level Three"
                        },
                        {
                            "$type": "p",
                            "$text": "An unordered list example:"
                        },
                        {
                            "$type": "ul",
                            "$nodes": [
                                {
                                    "$type": "li",
                                    "$text": "List item number one"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number two"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number three "
                                }
                            ]
                        },
                        {
                            "$type": "p",
                            "$text": "An ordered list example:"
                        },
                        {
                            "$type": "ol",
                            "$nodes": [
                                {
                                    "$type": "li",
                                    "$text": "List item number one"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number two"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number three"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number four"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number five"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number six"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number seven"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number eight"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number nine"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number ten"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number eleven"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number twelve"
                                },
                                {
                                    "$type": "li",
                                    "$text": "List item number thirteen"
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

const SideBar = {
    "$type": "aside",
    "id": "sidebar",
    "$nodes": [
        {
            "$type": "div",
            "id": "archives",
            "class": "boxed",
            "$nodes": [
                {
                    "$type": "h2",
                    "$text": "Archives"
                },
                {
                    "$type": "div",
                    "class": "content",
                    "$nodes": [
                        {
                            "$type": "ul",
                            "$nodes": [
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "February 2007"
                                        },
                                        {
                                            "$type": "i",
                                            "$text": "(25)"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "class": "active",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "January 2007"
                                        },
                                        {
                                            "$type": "i",
                                            "$text": "(31)"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "December 2006"
                                        },
                                        {
                                            "$type": "i",
                                            "$text": "(31)"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "November 2006"
                                        },
                                        {
                                            "$type": "i",
                                            "$text": "(30)"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "October 2006"
                                        },
                                        {
                                            "$type": "i",
                                            "$text": "(31)"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "$type": "div",
            "id": "categories",
            "class": "boxed",
            "$nodes": [
                {
                    "$type": "h2",
                    "$text": "Categories"
                },
                {
                    "$type": "div",
                    "class": "content",
                    "$nodes": [
                        {
                            "$type": "ul",
                            "$nodes": [
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Donec Dictum Metus"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Etiam Rhoncus Volutpat"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Integer Gravida Nibh"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Maecenas Luctus Lectus"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Mauris Vulputate Dolor Nibh"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "class": "active",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Nulla Luctus Eleifend"
                                        }
                                    ]
                                },
                                {
                                    "$type": "li",
                                    "$nodes": [
                                        {
                                            "$type": "a",
                                            "href": "#",
                                            "$text": "Posuere Augue Sit Nisl"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

var Main = {
    "$app": true,
    "id": "content",
    "$nodes": [SideBar, Content]
}
