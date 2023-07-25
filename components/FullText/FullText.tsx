import { RichTextRenderer } from "@caisy/rich-text-react-renderer";
import { DocumentLink } from "./overwrites/DocumentLink"; // Ensure the path to your DocumentLink component is correct.

interface IFullText {
  text?: any;
}

export const FullText: React.FC<IFullText> = ({ text }) => {
  return (
    <div className="m-10 flex items-center justify-center">
      <div className="max-w-prose">
      <article className="prose lg:prose-xl">
        {text?.json && (
          <RichTextRenderer
            node={text?.json}
            overwrites={{
              documentLink: (props) =>
                props?.node && text?.connections ? (
                  <DocumentLink
                    node={props.node}
                    connections={text.connections}
                  />
                ) : null,
            }}
          />
        )}
      </article>
</div>
    </div>
  );
};


