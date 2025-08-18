{/* Series Detail Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="font-bold font-playfair">{selectedSeries?.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedSeries?.description}</p>
              </ModalHeader>
              <ModalBody>
                {selectedSeries && (
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <Card>
                      <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold">Overall Progress</span>
                          <span className="text-lg font-bold font-playfair">{selectedSeries.progress}%</span>
                        </div>
                        <Progress value={selectedSeries.progress} color="primary" className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {selectedSeries.completedTests} of {selectedSeries.totalTests} tests completed
                        </p>
                      </CardBody>
                    </Card>

                    {/* Available Today */}
                    {selectedSeries.tests.availableToday.length > 0 && (
                      <div>
                        <h4 className="font-bold font-playfair mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-success" />
                          Available Today
                        </h4>
                        {selectedSeries.tests.availableToday.map((test) => renderTestCard(test))}
                      </div>
                    )}

                    {/* Upcoming Tests */}
                    {selectedSeries.tests.upcoming.length > 0 && (
                      <div>
                        <h4 className="font-bold font-playfair mb-3 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-warning" />
                          Upcoming Tests
                        </h4>
                        {selectedSeries.tests.upcoming.map((test) => renderTestCard(test, false))}
                      </div>
                    )}

                    {/* Completed Tests */}
                    {selectedSeries.tests.completed.length > 0 && (
                      <div>
                        <h4 className="font-bold font-playfair mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-success" />
                          Completed Tests
                        </h4>
                        {selectedSeries.tests.completed.map((test) => renderTestCard(test))}
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>