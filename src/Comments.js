import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";

export default function Comments({ comments }) {
  return comments.map(
    (comment) =>
      comment.kind !== "more" && (
        <Accordion disableGutters key={comment.data.id}>
          <AccordionSummary expandIcon={<ExpandMore />}>
            {comment.data.author}
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {comment.data.body}
              </Typography>
            </Box>
            {comment?.data?.replies?.data?.children &&
              comment.data.replies?.kind !== "more" && (
                <Comments comments={comment.data.replies?.data?.children} />
              )}
          </AccordionDetails>
        </Accordion>
      )
  );
}
