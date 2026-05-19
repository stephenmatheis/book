import { type FastifyPluginAsync } from "fastify";
import * as htmlparser2 from "htmlparser2";
import { selectOne } from "css-select";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get("/", async function (request, reply) {
        //
        const response = await fetch(
            "https://www.royalroad.com/fiction/118891/new-life-as-a-max-level-archmage/chapter/2729003/75-echoes",
        );
        const text = await response.text();
        const document = htmlparser2.parseDocument(text);
        const content = selectOne(".chapter-content", document);
        const serialize = htmlparser2.DomUtils.textContent(content!);

        console.log(serialize);

        return serialize;
    });
};

export default example;
