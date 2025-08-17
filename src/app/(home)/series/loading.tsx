import { Row, Col, Card } from "antd";

export default function SeriesSkeleton({ count = 6 }) {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto px-4 py-8 mb-10">
      <div>
        <div className="relative">
          <div className="h-10 w-48 bg-slate-300 rounded mb-4"></div>
        </div>
      </div>
      <Row gutter={[24, 24]} >
        {Array.from({ length: count }).map((_, index) => (
          <Col xs={24} lg={8} key={index}>
            <Card className="shadow-lg border-0 h-full overflow-hidden animate-pulse">
              {/* Image */}
              <div className="relative">
                <div className="h-48 w-full bg-slate-200 rounded-md"></div>
                <div className="absolute top-4 right-4">
                  <div className="h-6 w-16 bg-slate-300 rounded"></div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="h-6 w-20 bg-slate-300 rounded"></div>
                </div>
              </div>

              <div className="space-y-4 mt-4">
                {/* Title */}
                <div>
                  <div className="h-5 w-3/4 bg-slate-300 rounded mb-2"></div>
                  <div className="h-4 w-24 bg-slate-200 rounded mb-2"></div>
                  <div className="h-3 w-full bg-slate-200 rounded"></div>
                  <div className="h-3 w-2/3 bg-slate-200 rounded mt-1"></div>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 w-16 bg-slate-200 rounded"></div>
                  <div className="h-6 w-16 bg-slate-200 rounded"></div>
                  <div className="h-6 w-16 bg-slate-200 rounded"></div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  <div className="h-4 w-20 bg-slate-200 rounded"></div>
                </div>

                {/* Price + Button */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div>
                    <div className="h-6 w-28 bg-slate-300 rounded mb-2"></div>
                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-9 w-24 bg-slate-300 rounded-lg"></div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
