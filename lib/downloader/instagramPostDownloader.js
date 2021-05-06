require("dotenv").config();

const ig = require("instatouch");
const sID = process.env.sID;

const options = {
	// Number of posts to scrape: {int default: 0}
	count: 0,
	// Media type to scrape: ["image", "video", "all"]: {string default: 'all'}
	mediaType: "all",
	timeout: 0,
	session: "sessionid=" + sID,
};

/**
 *
 * @param {String | Url} url
 * @returns
 */
module.exports = async function (url) {
	url = url.split("?")[0];
	try {
		let res = await ig.getPostMeta(url, options);
		let {
			is_video,
			username,
			created_at,
			full_name,
			__typename,
			is_private,
			caption_is_edited,
			text,
		} = res.graphql.shortcode_media;
		if (is_private) {
			return "private";
		}
		if (!is_video && __typename != "GraphSidecar") {
			let type = __typename == "GraphImage" ? "Image" : "Saya tidak tau";
			let image = res.graphql.shortcode_media.display_url;
			return { type, image };
		}
		if (is_video) {
			let type = __typename == "GraphVideo" ? "Video" : "Saya tidak tau";
			let video = res.graphql.shortcode_media.video_url;
			let duration = res.graphql.shortcode_media.video_duration;
			return { type, video, duration };
		}
		if (__typename == "GraphSidecar") {
			let type = __typename == "GraphSidecar" ? "Slide" : "Saya tidak tau";
			let media = res.graphql.shortcode_media.edge_sidecar_to_children.edges;
			let tempArr = [];
			for (a of media) {
				let type2 = a.node.__typename == "GraphVideo" ? "Video" : "Image";
				if (a.node.__typename == "GraphVideo") {
					med = a.node.video_url;
				} else if (a.node.__typename == "GraphImage") {
					med = a.node.display_url;
				}
				tempArr.push({ type: type2, media: med });
				// console.log(med);
			}
			return { type, slide: tempArr };
		}
	} catch (err) {
		console.log(err);
		return false;
	}
};
