/** The Web UI Theme-v2.4.0 */ ;
layui.define("admin", function(a) {
	function n(e) {
		function a() {
			r.tabChange(o, e.url), d.tabsBodyChange(s.index, {
				url: e.url,
				title: e.title
			})
		}
		e = c.extend({
			url: "",
			escape: !0
		}, e);
		var i, t = c("#LAY_app_tabsheader>li"),
			n = e.url.replace(/(^http(s*):)|(\?[\s\S]*$)/g, "");
		t.each(function(a) {
				c(this).attr("lay-id") === e.url && (i = !0, s.index = a)
			}), e.title = e.title || (0 === s.index ? "" : "\u65b0\u6807\u7b7e\u9875"), l.pageTabs ? i || (
				setTimeout(function() {
					c("#LAY_app_body").append(['<div class="layadmin-tabsbody-item layui-show">',
						'<iframe src="' + e.url +
						'" frameborder="0" class="layadmin-iframe"></iframe>', "</div>"
					].join("")), a()
				}, 10), s.index = t.length, r.tabAdd(o, {
					title: "<span>" + (t = u.escape(e.title), e.highlight ? '<span style="' + e.highlight +
						'">' + t + "</span>" : t) + "</span>",
					id: e.url,
					attr: n
				})) : d.tabsBody(d.tabsPage.index).find(".layadmin-iframe")[0].contentWindow.location.href = e
			.url, a()
	}
	var l = layui.setter,
		r = layui.element,
		d = layui.admin,
		s = d.tabsPage,
		e = layui.view,
		u = layui.util,
		o = "layadmin-layout-tabs",
		c = layui.$,
		e = (c(window), d.screen() < 2 && d.sideFlexible(), e().autoRender(), function a() {
			var e = layui.url().hash,
				i = l.record || {},
				e = e.path.join("/"),
				t = (layui.data(l.tableName).record || {})[e] || "";
			return i.url && e && (i = c.trim(e), /^(\w*:)*\/\/.+/.test(i) && -1 === i.indexOf(location
				.hostname) || n({
				url: e,
				title: t
			})), setTimeout(function() {
				c("#" + l.container).css("visibility", "visible")
			}, 300), a
		}(), {
			openTabsPage: n
		});
	c.extend(d, e), a("adminIndex", e)
});